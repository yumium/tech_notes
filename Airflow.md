# Airflow

OSS orchestration tool

Features:

- Develop, schedule and monitor batch-oriented workflows
- Dynamic: pipelines can be generated dynamically
- Extensible: to various environments
- Workflows are stored as code, so you get the benefits of version control, unit testing, extensibility etc.



Why not airflow?

- If you want a low-code thing
- If you have an infinitely running event-based workflow or streaming
  - Airflow better for finite workflows





## Quickstart



Airflow needs home folder (to store configs, DB etc.). Default is `~/airflow` overwrite with `AIRFLOW_HOME` environment var.

CLI

```
airflow standalone
```

This sets up default config in `AIRFLOW_HOME` and launches airflow with UI at `localhost:8080`. Uses default SQLite database (not scalable)

What `standalone` command does under the hood

```
airflow db migrate

airflow users create \
    --username admin \
    --firstname Peter \
    --lastname Parker \
    --role Admin \
    --email spiderman@superhero.org

airflow webserver --port 8080

airflow scheduler
```





## Fundamental concepts



Airflow Python script is really just a config file for DAG structure. Actual tasks are run by different workers. Don't try to pass data between tasks.



**Importing**

```python
import textwrap
from datetime import datetime, timedelta

# The DAG object; we'll need this to instantiate a DAG
from airflow.models.dag import DAG

# Operators; we need this to operate!
from airflow.operators.bash import BashOperator
```



**Instantiate a DAG**

```python
with DAG(
    # DAG ID
    "tutorial",
    
    # These args will get passed on to each operator
    # You can override them on a per-task basis during operator initialization
    default_args={
        "depends_on_past": False,
        "email": ["airflow@example.com"],
        "email_on_failure": False,
        "email_on_retry": False,
        "retries": 1,
        "retry_delay": timedelta(minutes=5),
        # 'queue': 'bash_queue',
        # 'pool': 'backfill',
        # 'priority_weight': 10,
        # 'end_date': datetime(2016, 1, 1),
        # 'wait_for_downstream': False,
        # 'sla': timedelta(hours=2),
        # 'execution_timeout': timedelta(seconds=300),
        # 'on_failure_callback': some_function, # or list of functions
        # 'on_success_callback': some_other_function, # or list of functions
        # 'on_retry_callback': another_function, # or list of functions
        # 'sla_miss_callback': yet_another_function, # or list of functions
        # 'on_skipped_callback': another_function, #or list of functions
        # 'trigger_rule': 'all_success'
    },
    description="A simple tutorial DAG",
    schedule=timedelta(days=1),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=["example"],
) as dag:
```

DAG = collection of tasks with dependencies between them



**Operators**

Operator = a unit of work for Airflow

Inherits from `BaseOperator`

Eg. `PythonOperator`, `BashOperator`



**Task**

To use an operator in a DAG, you have to instantiate it as a task. Tasks determine how to execute your operator’s work within the context of a DAG.

2 tasks:

```python
t1 = BashOperator(
    task_id="print_date",
    bash_command="date",
)

t2 = BashOperator(
    task_id="sleep",
    depends_on_past=False,
    bash_command="sleep 5",
    retries=3,  # optional argument in `BaseOperator` that we're overwriting here
)
```

Precedence rules for params:

1. Explicitly passed arguments
2. Values that exist in the `default_args` dictionary
3. The operator’s default value, if one exists



**Templating with Jinja**

```python
templated_command = textwrap.dedent(
    """
{% for i in range(5) %}
    echo "{{ ds }}"
    echo "{{ macros.ds_add(ds, 7)}}"
{% endfor %}
"""
)

t3 = BashOperator(
    task_id="templated",
    depends_on_past=False,
    bash_command=templated_command,
)
```



**Adding documentation**

DAG documentation supports markdown

Task documentation supports plain text, markdown, reStructuredText, json, and yaml

```python
t1.doc_md = textwrap.dedent(
    """\
#### Task Documentation
You can document your task using the attributes `doc_md` (markdown),
`doc` (plain text), `doc_rst`, `doc_json`, `doc_yaml` which gets
rendered in the UI's Task Instance Details page.
![img](https://imgs.xkcd.com/comics/fixing_problems.png)
**Image Credit:** Randall Munroe, [XKCD](https://xkcd.com/license.html)
"""
)

dag.doc_md = __doc__  # providing that you have a docstring at the beginning of the DAG; OR
dag.doc_md = """
This is a documentation placed anywhere
"""  # otherwise, type it like this
```



**Setting up dependencies**

Different ways

```python
t1.set_downstream(t2)

# This means that t2 will depend on t1
# running successfully to run.
# It is equivalent to:
t2.set_upstream(t1)

# The bit shift operator can also be
# used to chain operations:
t1 >> t2

# And the upstream dependency with the
# bit shift operator:
t2 << t1

# Chaining multiple dependencies becomes
# concise with the bit shift operator:
t1 >> t2 >> t3

# A list of tasks can also be set as
# dependencies. These operations
# all have the same effect:
t1.set_downstream([t2, t3])
t1 >> [t2, t3]
[t2, t3] << t1
```



**Recap**

```python

import textwrap
from datetime import datetime, timedelta

# The DAG object; we'll need this to instantiate a DAG
from airflow.models.dag import DAG

# Operators; we need this to operate!
from airflow.operators.bash import BashOperator
with DAG(
    "tutorial",
    # These args will get passed on to each operator
    # You can override them on a per-task basis during operator initialization
    default_args={
        "depends_on_past": False,
        "email": ["airflow@example.com"],
        "email_on_failure": False,
        "email_on_retry": False,
        "retries": 1,
        "retry_delay": timedelta(minutes=5),
        # 'queue': 'bash_queue',
        # 'pool': 'backfill',
        # 'priority_weight': 10,
        # 'end_date': datetime(2016, 1, 1),
        # 'wait_for_downstream': False,
        # 'sla': timedelta(hours=2),
        # 'execution_timeout': timedelta(seconds=300),
        # 'on_failure_callback': some_function, # or list of functions
        # 'on_success_callback': some_other_function, # or list of functions
        # 'on_retry_callback': another_function, # or list of functions
        # 'sla_miss_callback': yet_another_function, # or list of functions
        # 'on_skipped_callback': another_function, #or list of functions
        # 'trigger_rule': 'all_success'
    },
    description="A simple tutorial DAG",
    schedule=timedelta(days=1),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=["example"],
) as dag:

    # t1, t2 and t3 are examples of tasks created by instantiating operators
    t1 = BashOperator(
        task_id="print_date",
        bash_command="date",
    )

    t2 = BashOperator(
        task_id="sleep",
        depends_on_past=False,
        bash_command="sleep 5",
        retries=3,
    )
    t1.doc_md = textwrap.dedent(
        """\
    #### Task Documentation
    You can document your task using the attributes `doc_md` (markdown),
    `doc` (plain text), `doc_rst`, `doc_json`, `doc_yaml` which gets
    rendered in the UI's Task Instance Details page.
    ![img](https://imgs.xkcd.com/comics/fixing_problems.png)
    **Image Credit:** Randall Munroe, [XKCD](https://xkcd.com/license.html)
    """
    )

    dag.doc_md = __doc__  # providing that you have a docstring at the beginning of the DAG; OR
    dag.doc_md = """
    This is a documentation placed anywhere
    """  # otherwise, type it like this
    templated_command = textwrap.dedent(
        """
    {% for i in range(5) %}
        echo "{{ ds }}"
        echo "{{ macros.ds_add(ds, 7)}}"
    {% endfor %}
    """
    )

    t3 = BashOperator(
        task_id="templated",
        depends_on_past=False,
        bash_command=templated_command,
    )

    t1 >> [t2, t3]
```



**Testing**

Python syntax OK

```
python ~/airflow/dags/tutorial.py
```



Airflow parsing OK

```bash
# initialize the database tables
airflow db migrate

# print the list of active DAGs
airflow dags list

# prints the list of tasks in the "tutorial" DAG
airflow tasks list tutorial

# prints the hierarchy of tasks in the "tutorial" DAG
airflow tasks list tutorial --tree
```



Running specific tasks

```bash
# command layout: command subcommand [dag_id] [task_id] [(optional) date]

# testing print_date
airflow tasks test tutorial print_date 2015-06-01

# testing sleep
airflow tasks test tutorial sleep 2015-06-01
```



## TaskFlow API



An improvement over traditional Airflow DAG API. Benefits:

- More Python and readable code
  - @task and @dag operators
- Automatic task dependency using function calls
- Auto-passing data with return values rather than explicitly using XCom
- Simple parameter passing via functional arguments
- Support for Python type hints
- Easier to test as tasks are now normal Python functions



**DAG**

```python
@dag(
    # DAG parameters inside decorator
    schedule=None,
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False,
    tags=["example"],
)
def tutorial_taskflow_api():  # function name is now DAG ID
    """
    ### TaskFlow API Tutorial Documentation
    This is a simple data pipeline example which demonstrates the use of
    the TaskFlow API using three simple tasks for Extract, Transform, and Load.
    Documentation that goes along with the Airflow TaskFlow API tutorial is
    located
    [here](https://airflow.apache.org/docs/apache-airflow/stable/tutorial_taskflow_api.html)
    """
```



**Tasks**

```python
@task()
def extract():  # function name is now task name
    """
    #### Extract task
    A simple Extract task to get data ready for the rest of the data
    pipeline. In this case, getting data is simulated by reading from a
    hardcoded JSON string.
    """
    data_string = '{"1001": 301.27, "1002": 433.21, "1003": 502.22}'

    order_data_dict = json.loads(data_string)
    return order_data_dict  # return value available for future tasks
```



**Data passing and dependencies**

```python
# Example ETL task dependencies
order_data = extract()
order_summary = transform(order_data)
load(order_summary["total_order_value"])
```

Data passed via XCom variables under the hood

https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html

- Tasks are independent and can run on separate machines
- XCom data is identified by `key`
- Data stored in object storage, defined in `BaseXCom` class

Dependencies generated automatically via invocations



**Task reuse**

Tasks are just functions so they can be invoked in many places. Just replace `task_id` etc.

```python
from airflow.decorators import task, dag
from datetime import datetime


@task
def add_task(x, y):
    print(f"Task args: x={x}, y={y}")
    return x + y


@dag(start_date=datetime(2022, 1, 1))
def mydag():
    start = add_task.override(task_id="start")(1, 2)
    for i in range(3):
        start >> add_task.override(task_id=f"add_start_{i}")(start, i)


@dag(start_date=datetime(2022, 1, 1))
def mydag2():
    start = add_task(1, 2)
    for i in range(3):
        start >> add_task.override(task_id=f"new_add_task_{i}")(start, i)


first_dag = mydag()
second_dag = mydag2()
```

```python
# add_task is defined in the `common` file
from common import add_task
from airflow.decorators import dag
from datetime import datetime


@dag(start_date=datetime(2022, 1, 1))
def use_add_task():
    start = add_task.override(priority_weight=3)(1, 2)
    for i in range(3):
        start >> add_task.override(task_id=f"new_add_task_{i}", retries=4)(start, i)


created_dag = use_add_task()
```



**Conditional skips**

```python
@task.run_if(lambda context: context["task_instance"].task_id == "run")
@task.bash()
def echo() -> str:
    return "echo 'run'"
```






## Timetables

### Cron expression
You may set your DAG to run on a simple schedule by setting its schedule argument to either a cron expression, a datetime.timedelta object, or one of the Cron Presets.

```python
from airflow.models.dag import DAG

import datetime

dag = DAG("regular_interval_cron_example", schedule="0 0 * * *", ...)

dag = DAG("regular_interval_cron_preset_example", schedule="@daily", ...)

dag = DAG("regular_interval_timedelta_example", schedule=datetime.timedelta(days=1), ...)
```


Cron presets:

| preset        | meaning                                                            | cron          |
| ------------- | ------------------------------------------------------------------ | ------------- |
| `None`        | Don’t schedule, use for exclusively “externally triggered” DAGs    |               |
| `@once`       | Schedule once and only once                                        |               |
| `@continuous` | Run as soon as the previous run finishes                           |               |
| `@hourly`     | Run once an hour at the end of the hour                            | `0 * * * *`   |
| `@daily`      | Run once a day at midnight (24:00)                                 | `0 0 * * *`   |
| `@weekly`     | Run once a week at midnight (24:00) on Sunday                      | `0 0 * * 0`   |
| `@monthly`    | Run once a month at midnight (24:00) of the first day of the month | `0 0 1 * *`   |
| `@quarterly`  | Run once a quarter at midnight (24:00) on the first day            | `0 0 1 */3 *` |
| `@yearly`     | Run once a year at midnight (24:00) of January 1                   | `0 0 1 1 *`   |

### Timezone

Default timezone is UTC, can be changed in config

```
[core]
default_timezone = utc
```

UI displays times in default timezone (UTC)

Use `pendulum` to define timezone of DAG (if needs be different from default)
```
import pendulum

dag = DAG("my_tz_dag", start_date=pendulum.datetime(2016, 1, 1, tz="Europe/Amsterdam"))
op = EmptyOperator(task_id="empty", dag=dag)
print(dag.timezone)  # <Timezone [Europe/Amsterdam]>
```


## Production deployment

Switch to a production grade DB (PostgreSQL, MySQL), check config here:

```
[database]
sql_alchemy_conn = my_conn_string
```

Once you have changed the backend, airflow needs to create all the tables required for operation. Create an empty DB and give Airflow’s user permission to CREATE/ALTER it. Once that is done, you can run -

```
airflow db migrate
```



## Testing

**Basic syntax checks**

```python
python your-dag-file.py
```

Use same environment as production nodes, this checks for any uninstalled dependency and syntax errors

**Unit tests**

Loading

```python
import pytest

from airflow.models import DagBag


@pytest.fixture()
def dagbag():
    return DagBag()


def test_dag_loaded(dagbag):
    dag = dagbag.get_dag(dag_id="hello_world")
    assert dagbag.import_errors == {}
    assert dag is not None
    assert len(dag.tasks) == 1
```

DAG structure

```python
def assert_dag_dict_equal(source, dag):
    assert dag.task_dict.keys() == source.keys()
    for task_id, downstream_list in source.items():
        assert dag.has_task(task_id)
        task = dag.get_task(task_id)
        assert task.downstream_task_ids == set(downstream_list)


def test_dag():
    assert_dag_dict_equal(
        {
            "DummyInstruction_0": ["DummyInstruction_1"],
            "DummyInstruction_1": ["DummyInstruction_2"],
            "DummyInstruction_2": ["DummyInstruction_3"],
            "DummyInstruction_3": [],
        },
        dag,
    )
```

Custom operator

```python
import datetime

import pendulum
import pytest

from airflow import DAG
from airflow.utils.state import DagRunState, TaskInstanceState
from airflow.utils.types import DagRunType

DATA_INTERVAL_START = pendulum.datetime(2021, 9, 13, tz="UTC")
DATA_INTERVAL_END = DATA_INTERVAL_START + datetime.timedelta(days=1)

TEST_DAG_ID = "my_custom_operator_dag"
TEST_TASK_ID = "my_custom_operator_task"


@pytest.fixture()
def dag():
    with DAG(
        dag_id=TEST_DAG_ID,
        schedule="@daily",
        start_date=DATA_INTERVAL_START,
    ) as dag:
        MyCustomOperator(
            task_id=TEST_TASK_ID,
            prefix="s3://bucket/some/prefix",
        )
    return dag


def test_my_custom_operator_execute_no_trigger(dag):
    dagrun = dag.create_dagrun(
        state=DagRunState.RUNNING,
        execution_date=DATA_INTERVAL_START,
        data_interval=(DATA_INTERVAL_START, DATA_INTERVAL_END),
        start_date=DATA_INTERVAL_END,
        run_type=DagRunType.MANUAL,
    )
    ti = dagrun.get_task_instance(task_id=TEST_TASK_ID)
    ti.task = dag.get_task(task_id=TEST_TASK_ID)
    ti.run(ignore_ti_state=True)
    assert ti.state == TaskInstanceState.SUCCESS
    # Assert something related to tasks results.
```




**Staging environment**

Run your DAG in UAT environment before releasing to prod


**Mocking variables and connections**

```python
conn = Connection(
    conn_type="gcpssh",
    login="cat",
    host="conn-host",
)
conn_uri = conn.get_uri()
with mock.patch.dict("os.environ", AIRFLOW_CONN_MY_CONN=conn_uri):
    assert "cat" == Connection.get_connection_from_secrets("my_conn").login
```


## Core Concepts


### TaskFlow





### XComs

Short for "cross-communications", a mechanism that let Tasks talk to each other, as by default Tasks are entirely isolated and may be running on entirely different machines.

Each XCom is identified by a `key` (its name) and the `task_id` and `dag_id` it came from. Value can be any serialisable value.

XCom values are stored by default in the Airflow database, so XCom suitable for small values (not large dataframes).

You specify XCom flow using pull and push methods

```python
# pushes data in any_serializable_value into xcom with key "identifier as string"
task_instance.xcom_push(key="identifier as a string", value=any_serializable_value)

# Pulls the return_value XCOM from "pushing_task"
value = task_instance.xcom_pull(task_ids='pushing_task')
```

`@task` default pushes its return value under key `return_values`

```python
# A task returning a dictionary
@task(do_xcom_push=True, multiple_outputs=True)
def push_multiple(**context):
    return {"key1": "value1", "key2": "value2"}

@task
def xcom_pull_with_multiple_outputs(**context):
    # Pulling a specific key from the multiple outputs
    key1 = context["ti"].xcom_pull(task_ids="push_multiple", key="key1")  # to pull key1
    key2 = context["ti"].xcom_pull(task_ids="push_multiple", key="key2")  # to pull key2

    # Pulling entire xcom data from push_multiple task
    data = context["ti"].xcom_pull(task_ids="push_multiple", key="return_value")
```










## Templates

Reference: https://airflow.apache.org/docs/apache-airflow/stable/templates-ref.html#variables


