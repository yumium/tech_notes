# Angular



## What is Angular

Angular is a development platform, built on [TypeScript](https://www.typescriptlang.org/). As a platform, Angular includes:

- A component-based framework for building scalable web applications
- A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more
- A suite of developer tools to help you develop, build, test, and update your code



Component (individual elements that make up the webpage)

- HTML template
- Angular spits out DOM (framework track state changes and rerender as needed)

Dependency injection (TypeScript dependencies)



Angular CLI

| COMMAND                                        | DETAILS                                                      |
| :--------------------------------------------- | :----------------------------------------------------------- |
| [ng build](https://angular.io/cli/build)       | Compiles an Angular application into an output directory.    |
| [ng serve](https://angular.io/cli/serve)       | Builds and serves your application, rebuilding on file changes. |
| [ng generate](https://angular.io/cli/generate) | Generates or modifies files based on a schematic.            |
| [ng test](https://angular.io/cli/test)         | Runs unit tests on a given project.                          |
| [ng e2e](https://angular.io/cli/e2e)           | Builds and serves an Angular application, then runs end-to-end tests. |





## Components



### Overview

Each component consists of:

- An HTML template that declares what renders on the page
- A TypeScript class that defines behavior
- A CSS selector that defines how the component is used in a template
- Optionally, CSS styles applied to the template



CSS selector

```typescript
@Component({
    selector: 'app-component-overview',
})
```

This specifies that the component should be loaded whenever there is `<app-component-overview>` tag in the HTML



HTML template

1. Reference external file

```typescript
@Component({
    selector: 'app-component-overview',
    templateUrl: './component-overview.component.html',
})
```

2. Write the HTML

```typescript
@Component({
    selector: 'app-component-overview',
    template: '<h1>Hello World!</h1>',
})
```

3. Write the HTML (multiple lines)

```typescript
@Component({
    selector: 'app-component-overview',
    template: `
    	<h1>Hello World!</h1>
		<p>This template definition spans multiple lines.</p>
    `
})
```



Declaring component styles

1. Reference external file

```typescript
@Component({
  selector: 'app-component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.css']
})
```

2. Write the CSS

```typescript
@Component({
  selector: 'app-component-overview',
  template: '<h1>Hello World!</h1>',
  styles: ['h1 { font-weight: normal; }']
})
```







### Lifecycle

1. Creation: instantiates class & renders the component view
2. Update: change detection
3. Deletion: destroys the component instance



Angular has a list of predefined lifecycle steps https://angular.io/guide/lifecycle-hooks

We can define lifecycle hooks in components with `ng<lifecycle name>` to declare the function that needs to be called during that component's lifecycle. Angular will then call these functions when the lifecycle event triggers

```typescript
@Directive({selector: '[appPeekABoo]'})
export class PeakABooDirective implements OnInit {
    constructor(private logger: LoggerService) { }
    
    // Implement OnInit's `ngOnInit` method
    ngOnInit () {
        this.logIt('OnInit');
    }
    
    logIt (msg: string) {
        this.logger.log(`#${nextId++} ${msg}`)
    }
}
```



```typescript
let nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div appSpy>...</div>
@Directive({selector: '[appSpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  private id = nextId++;

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log(`Spy #${this.id} onInit`);
  }

  ngOnDestroy() {
    this.logger.log(`Spy #${this.id} onDestroy`);
  }
}
```







ngOnChanges

```typescript
@Input() hero!: Hero;
@Input() power = '';

ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);
        this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
}
```

OnChanges will be triggered when there are changes to the `Input` fields of the component.



Custom change hooks

```typescript
ngDoCheck() {

  if (this.hero.name !== this.oldHeroName) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
    this.oldHeroName = this.hero.name;
  }

  if (this.power !== this.oldPower) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
    this.oldPower = this.power;
  }

  if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      const count = this.noChangeCount += 1;
      const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      if (count === 1) {
        // add new "no change" message
        this.changeLog.push(noChangeMsg);
      } else {
        // update last "no change" message
        this.changeLog[this.changeLog.length - 1] = noChangeMsg;
      }
  }

  this.changeDetected = false;
}
```

Note, this hook is called whenever there are global changes to the entire webpage. So writing heavy workloads here will significantly impact performance.







### View encapsulation

When we apply styling to components, CSS statements will be generated by Angular. To avoid polluting the style into other components, Angular has a styling isolation scheme that specifies the styling *per component*.



| MODES                         | DETAILS                                                      |
| :---------------------------- | :----------------------------------------------------------- |
| `ViewEncapsulation.ShadowDom` | Angular uses the browser's built-in [Shadow DOM API](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM) to enclose the component's view inside a ShadowRoot, used as the component's host element, and apply the provided styles in an isolated manner. |
| `ViewEncapsulation.Emulated`  | Angular modifies the component's CSS selectors so that they are only applied to the component's view and do not affect other elements in the application, *emulating* Shadow DOM behavior. For more details, see [Inspecting generated CSS](https://angular.io/guide/view-encapsulation#inspect-generated-css).<br />This basically means generating unique CSS selectors that's only used by this component to avoid polluting other styles |
| `ViewEncapsulation.None`      | Angular does not apply any sort of view encapsulation meaning that any styles specified for the component are actually globally applied and can affect any HTML element present within the application. This mode is essentially the same as including the styles into the HTML itself. |



```typescript
@Component({
  selector: 'app-no-encapsulation',
  template: `
    <h2>None</h2>
    <div class="none-message">No encapsulation</div>
  `,
  styles: ['h2, .none-message { color: red; }'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NoEncapsulationComponent { }
```







### Component interaction

Passing data from parent to child with input binding

```typescript
// Child
import { Component, Input } from '@angular/core';

import { Hero } from './hero';

@Component({
    selector: 'app-hero-child';
    template: `
    	<h3>{{hero.name}} says:</h3>
    	<p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
    `
})
export class HeroChildComponent {
    @Input() hero!: Hero;
    @Input('master') masterName = '';  // Input from parent
}
```

```typescript
// Parent
import { Component } from '@angular/core';

import { HEROES } from './hero';

@Component({
  selector: 'app-hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>

    <app-hero-child
      *ngFor="let hero of heroes"
      [hero]="hero"
      [master]="master">
    </app-hero-child>
  `  // Input to child
})
export class HeroParentComponent {
  heroes = HEROES;
  master = 'Master';
}
```





Intercept input property changes with a setter

​	We might want additional logic handling input changes from parent

```typescript
// Child
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name-child',
  template: '<h3>"{{name}}"</h3>'
})
export class NameChildComponent {
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';  // Trims input and sets default value if input empty
  }
  private _name = '';
}
```

```typescript
// Parent
import { Component } from '@angular/core';

@Component({
  selector: 'app-name-parent',
  template: `
    <h2>Master controls {{names.length}} names</h2>

    <app-name-child *ngFor="let name of names" [name]="name"></app-name-child>
  `
})
export class NameParentComponent {
  // Displays 'Dr. IQ', '<no name set>', 'Bombasto'
  names = ['Dr. IQ', '   ', '  Bombasto  '];
}
```





Using the OnChanges lifecycle hook

```typescript
// Child
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-version-child',
  template: `
    <h3>Version {{major}}.{{minor}}</h3>
    <h4>Change log:</h4>
    <ul>
      <li *ngFor="let change of changeLog">{{change}}</li>
    </ul>
  `
})
export class VersionChildComponent implements OnChanges {
  @Input() major = 0;
  @Input() minor = 0;
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
}
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-version-parent',
  template: `
    <h2>Source code version</h2>
    <button type="button" (click)="newMinor()">New minor version</button>
    <button type="button" (click)="newMajor()">New major version</button>
    <app-version-child [major]="major" [minor]="minor"></app-version-child>
  `
})
export class VersionParentComponent {
  major = 1;
  minor = 23;

  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }
}
```







Pass data back from child to parent by specifying a listener

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voter',
  template: `
    <h4>{{name}}</h4>
    <button type="button" (click)="vote(true)"  [disabled]="didVote">Agree</button>
    <button type="button" (click)="vote(false)" [disabled]="didVote">Disagree</button>
  `
})
export class VoterComponent {
  @Input()  name = '';
  @Output() voted = new EventEmitter<boolean>();  // EventEmitter
  didVote = false;

  vote(agreed: boolean) {  // The output value emits an event, with payload that is a boolean
    this.voted.emit(agreed);
    this.didVote = true;
  }
}
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-vote-taker',
  template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>

    <app-voter
      *ngFor="let voter of voters"
      [name]="voter"
      (voted)="onVoted($event)">
    </app-voter>
  ` // Notice syntax for output, which instead of specifying the value passed down like inputs, it specifies the listener
})
export class VoteTakerComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Dr. IQ', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean) {
    if (agreed) {
      this.agreed++;
    } else {
      this.disagreed++;
    }
  }
}
```





Other avenues for child -> parent communication:

- Shared local variable
- @ViewChild()





We can establish/define bidirectional communication between parent and its children using a servicer, which is a separate piece of code that defines this communication.

```typescript
// Service
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
```

```typescript
// Mission control (parent)
import { Component } from '@angular/core';

import { MissionService } from './mission.service';

@Component({
  selector: 'app-mission-control',
  template: `
    <h2>Mission Control</h2>
    <button type="button" (click)="announce()">Announce mission</button>

    <app-astronaut
      *ngFor="let astronaut of astronauts"
      [astronaut]="astronaut">
    </app-astronaut>

    <h3>History</h3>
    <ul>
      <li *ngFor="let event of history">{{event}}</li>
    </ul>
  `,
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;

  constructor(private missionService: MissionService) {
    missionService.missionConfirmed$.subscribe(		// Subscribe to string stream
      astronaut => {
        this.history.push(`${astronaut} confirmed the mission`);
      });
  }

  announce() {
    const mission = this.missions[this.nextMission++];
    this.missionService.announceMission(mission);  // Using service
    this.history.push(`Mission "${mission}" announced`);
    if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }
}
```

```typescript
// Astronaut
import { Component, Input, OnDestroy } from '@angular/core';

import { MissionService } from './mission.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-astronaut',
  template: `
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button
        type="button"
        (click)="confirm()"
        [disabled]="!announced || confirmed">
        Confirm
      </button>
    </p>
  `
})
export class AstronautComponent implements OnDestroy {
  @Input() astronaut = '';
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
```







### Component Styles

While component styles are isolated using shadow DOM, it is still possible for global styles to affect all components



**Special selectors**

We can define special selectors within each component to have its effect on other components



`src/app/host-selector-example.component.ts`

```typescript
@Component({
  selector: 'app-main',
  template: `
      <h1>It Works!</h1>
      <div>
        Start editing to see some magic happen :)
      </div>
  `
})
export class HostSelectorExampleComponent {

}
```



**:host**

`src/app/hero-details.component.css`

```typescript
:host {
    font-style: italic;
}
```

This will affect the component and all of its children. Here, italicising the text



```typescript
:host h2 {
    font-weight: bold;
}
```

We can also add selectors behind `:host`



**:host-context**

This will target the component and all of it ancestors, all the way up to the document root.









**Adding styles**

Adding in component metadata

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}
```



Adding CSS files

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styleUrls: ['./hero-app.component.css']
})
export class HeroAppComponent {
/* . . . */
}
```

`hero-app.component.css`

```typescript
h1 {
  font-weight: normal;
}
```



Inline styles

```typescript
@Component({
  selector: 'app-hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button type="button" (click)="activate()">Activate</button>
  `
})
```









### Sharing data



**Sending data to a child component - @Input()**

`child.component.ts`

```typescript
import { Component, Input } from '@angular/core'; // First, import Input
export class ItemDetailComponent {
  @Input() item = ''; // decorate the property with @Input()
}
```

`child.component.html`

```html
<p>
  Today's item: {{item}}
</p>
```

`parent.component.ts`

```typescript
export class AppComponent {
  currentItem = 'Television';
}
```

`parent.component.html`

```html
<app-item-detail [item]="currentItem"></app-item-detail>
```





*Note the use of square brackets for child Input.*

To act on changes in `@Input()`, use `OnChanges`





**Sending data to a parent component - @Output()**

`child.component.ts`

```typescript
import { Output, EventEmitter } from '@angular/core';

export class ItemOutputComponent {

  @Output() newItemEvent = new EventEmitter<string>();  // event payload is a string

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}
```

`child.component.html`

```html
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>
<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
```



`parent.component.ts`

```typescript
export class AppComponent {
  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
}
```

`parent.component.html`

```html
<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
<ul>
  <li *ngFor="let item of items">{{item}}</li>
</ul>
```



*Note the use of round brackets for child Output.*





**Using them together**

```html
<app-input-output
  [item]="currentItem"
  (deleteRequest)="crossOffItem($event)">
</app-input-output>
```







### Content projection

**Single slot projection**

`child.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-zippy-basic',
  template: `
    <h2>Single-slot content projection</h2>
    <ng-content></ng-content>
  `
})
export class ZippyBasicComponent {}
```

`parent.component.html`

```html
<app-zippy-basic>
  <p>Is content projection cool?</p>
</app-zippy-basic>
```



**Multi slot projection** (use selectors)

`child.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-zippy-multislot',
  template: `
    <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content>
  `
})
export class ZippyMultislotComponent {}
```

`parent.component.html`

```html
<app-zippy-multislot>
  <p question>
    Is content projection cool?
  </p>
  <p>Let's learn about content projection!</p>
</app-zippy-multislot>
```



**Conditional slot projection**

^^ This is quite complicated

https://angular.io/guide/content-projection#conditional-content-projection







### Dynamic components

https://medium.com/angular-in-depth/loading-components-dynamically-in-angular-cd13b9fdb715

https://angular.io/guide/dynamic-component-loader



What if we want to load different content depending on factors, say the logged in user?

We can use `ngIf`, but that would require downloading all the component options.

Angular uses dynamic components to specify logic to create the right component at runtime.



- Components that need to be loaded dynamically.
- Service to load and resolve the Component dynamically.
- Directive to handle viewContainerRef.



- Create Guest Card and User Card Component
- Implementing Service to Load and Resolve Component
- Creating Profile directive and Profile component
- The final step, Updating App component and App module🤓
- Final words 🧡





```typescript
import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private cfr: ComponentFactoryResolver) {}

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    const { GuestCardComponent } = await import('./guest-card/guest-card.component');

    const { UserCardComponent } = await import('./user-card/user-card.component');

    vcr.clear();
    let component : any = isLoggedIn ? UserCardComponent : GuestCardComponent;
   
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(component))    
}}
```









### Angular elements

https://angular.io/guide/elements

We can turn components into custom web elements (like `<h1>`) and registered on browser.







## Templates



Template for creating HTML



### Text interpolation

Use `{{}}` in the corresponding component template to render the variable

```html
<h3>Current customer: {{ currentCustomer }}</h3>
```





### Template statements

We can pass in statements for HTML components to evaluate when an event is detected.

We use the `(event)="statement"` syntax

Example:

```html
<button type="button" (click)="deleteHero()">Delete</button>
```



The statement parser is less powerful than general JS, particularly we can't use: `new`, `+=`, `-=`, bitwise operators.

The parser does recognize adding multiple statements with `;`



Context of statement is that of the component (we can't access global variables like `Math.floor()` or `console.log()`)





### Binding

Bind the view with the model. Angular has an optimised change detection engine that rerenders the view efficiently.

Try not to trigger the change detection cycle too often as it can reduce performance of the webpage.





#### Property binding

Use syntax `[property]="statement"`

Examples:

```html
<button type="button" [disabled]="isUnchanged">Disabled Button</button>
```

```html
<img alt="item" [src]="itemImageUrl">
```

```html
<app-item-detail [childItem]="parentItem"></app-item-detail>
```



The statement is evaluated using the context of the component with that piece of HTML.

This can be used to pass information down to the children as well.

Note, if we don't use square brackets, Angular will evaluate the RHS just as a string.





#### Attribute binding

Advanced topic.





#### Class and style binding

Use expressions to dynamically change the styling of the component.



Class binding

```html
<nav [class.sale]="onSale"></nav>
```

If expression is truthy, the class `sale` will be applied to the component.



Style binding

```html
<nav [style.background-color]="expression"></nav>
```

Applies the value of `expression` to `background-color`



We can dynamically assign to multiple classes and styles





#### Event binding

```html
<button (click)="onSave()">Save</button>
```



Binding keyboard events

```html
<input (keydown.shift.t)="onKeydown($event)" />
```

We concatenate key presses with `.`







#### Two-way binding

Two-way binding allows not only the model to update the view, but also the view the update the model.

In Angular terms, it not only allow the parent component to assign values to the child, but also allow changes to child's variable to bubbles up to the parent as an event.



Example

`sizer` child component

```typescript
export class SizerComponent {

  @Input()  size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  dec() { this.resize(-1); }
  inc() { this.resize(+1); }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
```

^^ For two-way binding to work, child must have both `Input` and `Output` fields, where output is the name `inputChange` where `input` in the Input name



`sizer` child template

```html
<div>
  <button type="button" (click)="dec()" title="smaller">-</button>
  <button type="button" (click)="inc()" title="bigger">+</button>
  <span [style.font-size.px]="size">FontSize: {{size}}px</span>
</div>
```



`app` parent component

```typescript
...
fontSizePx = 16;
...
```



`app` parent template

```html
<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>
```

^^ The parent initializes the `size` variable of the child as 16



The 2 way binding (using `[()]` literal) keeps the parent's `fontSizePx` variable and child's `size` variable in sync.



Under the hood, this is just shorthand for both property and event binding

```html
<app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer>
```



*All this does is saving the need to write the (sizeChange) property*









### Pipes

Pipes = data transformation. Define once, use throughout application



Built-in pipes

- [`DatePipe`](https://angular.io/api/common/DatePipe): Formats a date value according to locale rules.
- [`UpperCasePipe`](https://angular.io/api/common/UpperCasePipe): Transforms text to all upper case.
- [`LowerCasePipe`](https://angular.io/api/common/LowerCasePipe): Transforms text to all lower case.
- [`CurrencyPipe`](https://angular.io/api/common/CurrencyPipe): Transforms a number to a currency string, formatted according to locale rules.
- [`DecimalPipe`](https://angular.io/api/common/DecimalPipe): Transforms a number into a string with a decimal point, formatted according to locale rules.
- [`PercentPipe`](https://angular.io/api/common/PercentPipe): Transforms a number to a percentage string, formatted according to locale rules.



Pipe operators have precedence over ternary operators

`a ? b : c | x` becomes `a ? b : (c | x)`



Example

```html
<p>The hero's birthday is {{ birthday | date }}</p>
```



Example - pipe input variables

```html
<p>The amount on your account is {{ amount | currency:'EUR' }}</p>
```



Example - chaining pipes

```html
<p>The chained hero's birthday is {{ birthday | date | uppercase }}</p>
```





### Template variables

You can declare variables as a tag in the template to take the value of the template. You can then use that variable in other parts of the template.

```html
<input #phone placeholder="phone number" />

<button type="button" (click)="callPhone(phone.value)">Call</button>
```



Or just include a template (below, setting the content inside the tooltip as an HTML template)

```html
<a class="link-primary" type="button" [ngbTooltip]="adminTooltipContent" placement="top" triggers="click" [autoClose]="'outside'">+{{adminGroups.length-1}} more</a>
```

```html
<ng-template #adminTooltipContent>
  <b>Feed admin groups</b>
   blah blah
</ng-template>
```





## Directives

Classes that give additional behavior to elements in your Angular app.

Attribute directive = listen to and modify HTML elements

Structural directive = HTML layout





### Built-in attribute directives

#### ngClass

Change the class of an element based on variable values.

<u>With expression</u>

```html
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
```



<u>With method</u>

ngClass can also take an object, where keys are classes and values are booleans, indicating whether the class should be activated for the element.

This dictionary will be initialized at `onInit` and updated on any variable change

```typescript
currentClasses: Record<string, boolean> = {};
/* . . . */
setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses =  {
    saveable: this.canSave,
    modified: !this.isUnchanged,
    special:  this.isSpecial
  };
}
```

```html
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special.</div>
```





#### ngStyle

Similar to `ngClass`, you can set inline styles passing in an object where keys are style keys and values are style values

```typescript
currentStyles: Record<string, string> = {};
/* . . . */
setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '24px'   : '12px'
  };
}
```

```html
<div [ngStyle]="currentStyles">
  This div is initially italic, normal weight, and extra large (24px).
</div>
```





#### ngModel

Another way to implement two-way binding

```typescript
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular
/* . . . */
@NgModule({
  /* . . . */

  imports: [
    BrowserModule,
    FormsModule // <--- import into the NgModule
  ],
  /* . . . */
})
export class AppModule { }
```

```html
<label for="example-ngModel">[(ngModel)]:</label>
<input [(ngModel)]="currentItem.name" id="example-ngModel">
```





### Built-in structural directives

#### ngIf

Displays the DOM only if the variable is Truthy

```html
<app-item-detail *ngIf="isActive" [item]="item"></app-item-detail>
```

If a snippet does not show, the resources are freed.

By default, `ngIf` will not show if any variables binded inside the snippet is `null`





#### ngFor

```html
<div *ngFor="let item of items">{{item.name}}</div>
```

Getting index:

```html
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>
```



<u>Performance enhancement with `ngFor`</u>

We can use an `ngFor` over an `ngIf` to display only the list of elements that are truthy

But we can let the `ngFor` track certain variables and no rerender the child element if that value stays the same

`app.component.ts`

```typescript
trackByItems(index: number, item: Item): number { return item.id; }
```

`app.component.html`

```html
<div *ngFor="let item of items; trackBy: trackByItems">
  ({{item.id}}) {{item.name}}
</div>
```

See the `trackBy` shorthand



**<ng-container>**

Use `<ng-container>` if you need a place to store directives when there's no natural HTML element. These are not rendered in the DOM

```html
<p>
  I turned the corner
  <ng-container *ngIf="hero">
    and saw {{hero.name}}. I waved
  </ng-container>
  and continued on my way.
</p>
```





#### ngSwitch

Like a switch statement in JS, this directive matches a variable with a switch statement, and render the component in the switch statement that matches

```html
<div [ngSwitch]="currentItem.feature">
  <app-stout-item    *ngSwitchCase="'stout'"    [item]="currentItem"></app-stout-item>
  <app-device-item   *ngSwitchCase="'slim'"     [item]="currentItem"></app-device-item>
  <app-lost-item     *ngSwitchCase="'vintage'"  [item]="currentItem"></app-lost-item>
  <app-best-item     *ngSwitchCase="'bright'"   [item]="currentItem"></app-best-item>
<!-- . . . -->
  <app-unknown-item  *ngSwitchDefault           [item]="currentItem"></app-unknown-item>
</div>
```





### Attribute directives

Details for creating custom attribute directives here: https://angular.io/guide/attribute-directives





### Structural directives

Details for creating custom structural directives here: https://angular.io/guide/structural-directives









## Dependency injection

Idea: share a service, or even just a function, from one application to another

Angular provides injection using an abstraction called `Injector`, with dependency providers and consumers. When a dependency is requested by the consumer, Angular will search for that dependency in its index, and create one if it's not found.

How often Angular creates new dependencies depend on where it's injected.





### Providing dependency

<u>At application root level</u>

```typescript
@Injectable({
  providedIn: 'root'
})
class HeroService {}
```

When you provide the service at the root level, Angular creates a single, shared instance of the `HeroService` and injects it into any class that asks for it.



<u>At ngModule level</u>

```typescript
@NgModule({
  declarations: [HeroListComponent]
  providers: [HeroService]
})
class HeroListModule {}
```

A single instance of `HeroService` is available to all components, directives, and pipes inside the module



<u>At component level</u>

```typescript
@Component({
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
```

An instance of `HeroService` is created for every instance of `HeroListComponent `component





### Creating an injectable service

Service is a broad category encompassing any value, function, or feature that an application needs. A service is typically a class with a narrow, well-defined purpose. A component is one type of class that can use DI.



Example:

Create a logger service

```typescript
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
```

Create a hero service that depends on logger

```typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private logger: Logger) {  }

  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;  // Return heros from the backend (which is just a file)
  }
}
```





### Dependency injection providers

Details on how to have constants, functions etc. as dependencies: https://angular.io/guide/dependency-injection-providers









## MFE (micro-frontend)

Like micro-services architecture used on frontend applications

This is building distributed architectures



**Features of Mirco-Frontends**

- Each frontend represents a specific feature or subdomain of the entire application
- Each frontend can be implemented with a separate team.
- Each frontend can be implemented with different technology.
- They cannot share logic and its independent of each other.
- Each Frontend can be owned by a single team.



(Possible) Ways of splitting:

- By feature
- By section
- By page
- By domain (core domain, profile domain, payments domain)





##  Testing



Projects created by Angular CLI are ready to test immediately

```shell
ng test
```

This launches the Karma tester in a new browser, and unit tests are run at each script update.



To generate code coverage, run

```shell
ng test --no-watch --code-coverage
```



TestBed

Can create the service in the TestBed inside `beforeEach()`, so the `it()` unit tests afterwards will have the service set up.

```typescript
// Straight Jasmine testing without Angular's testing support
describe('ValueService', () => {
  let service: ValueService;
  beforeEach(() => { service = new ValueService(); });

  it('#getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('#getPromiseValue should return value from a promise',
    (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });
});
```





### Jasmine

Jasmine is a BDD framework for JavaScript.

The `describe` function group related specs, string parameter is for naming this collection of specs, it is then concatenated with the `it` string for the full test name.

If you name them well, they will read full sentences.

```javascript
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});
```



`describe` and `it` are just functions, so they can contain whatever code to make the tests.

Standard JS scoping rules apply, whatever variable inside `describe` will be visible from `it` functions.

```javascript
describe("A suite is just a function", function() {
    let a;

    it("and so is a spec", function() {
        a = true;

        expect(a).toBe(true);
    });
});
```





An expectation is an assertion of either True or False.

A spec with all passing expectations is a pass, otherwise it's a fail.

```javascript
describe("The 'toBe' matcher compares with ===", function() {
	it("and has a positive case", function() {
        expect(true).toBe(true);
    });
    
    it("and can have a negative case", function() {
        expect(false).not.toBe(true);
    });
});
```

List of matchers:

https://jasmine.github.io/api/edge/matchers.html

Creating customer matchers: https://jasmine.github.io/tutorials/custom_matcher.html



You can save time with setup and teardown with `before/after each/all`:

- `beforeEach` and `afterEach` is executed before and after each spec
- `beforeAll` and `afterAll` is executed just once before and after all specs



A fail function causes the spec to fail. This is useful for testing that something shouldn't happen

```javascript
describe("A spec using the fail function", function() {
    function foo(x, callBack) {
        if (x) {
            callBack();
        }
    };

    it("should not call the callBack", function() {
        foo(false, function() {
            fail("Callback has been called");
        });
    });
});
```



Describe blocks can be nested

This allows spec files to have the `beforeEach` function called for all of its ancestors, in the order from the root to its parent. Similar for `afterEach`

```javascript
describe("A spec", function() {
    let foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });
    
    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", function() {
        let bar;

        beforeEach(function() {
          bar = 1;
        });
    
        it("can reference both scopes as needed", function() {
          expect(foo).toEqual(bar);
        });
    });
});
```





Simply putting `x` before `describe` will disable this test

```javascript
xdescribe("A spec", function() {
    let foo;
    
    beforeEach(function() {
        foo = 0;
        foo += 1;
    });
    
    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });
});
```



Putting `x` before `it` will make the testing pending, so is not including a function and adding a `pending` statement

```javascript
describe("Pending specs", function() {
    xit("can be declared 'xit'", function() {
        expect(true).toBe(false);
    });
    
	it("can be declared with 'it' but without a function");

    it("can be declared by calling 'pending' in the spec body", function() {
        expect(true).toBe(false);
        pending('this is why it is pending');
    });
});
```





You can easily create code doubles using `spyOn`. `spyOn` and stub any function and track its calls and arguments for calls.

Spies are created inside `describe` and `it`, and will be destroyed after.

```javascript
describe("A spy", function() {
    let foo;
    let bar = null;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };
        
        spyOn(foo, 'setBar');

        foo.setBar(123);
        foo.setBar(456, 'another param');
    });
    
    it("tracks that the spy was called", function() {
        expect(foo.setBar).toHaveBeenCalled();
    });
    
    it("tracks that the spy was called x times", function() {
        expect(foo.setBar).toHaveBeenCalledTimes(2);
    });
    
    it("tracks all the arguments of its calls", function() {
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });
    
    it("stops all execution on a function", function() {
        expect(bar).toBeNull();
    });
    
    it("tracks if it was called at all", function() {
        foo.setBar();
        
        expect(foo.setBar.calls.any()).toEqual(true);
    });
});
```

Following a `spyOn` with `.and.callThrough()` would still track the calls, but resort to underlying implementation

```typescript
spyOn(component, 'orderPizza').and.callThrough();
component.orderPizza();
expect(component.pizzaOrder).toBeTruthy();
```







Use `createSpy` to create a "bare spy". It tracks all calls without any implementation behind it.

```javascript
describe("A spy, when created manually", function() {
    let whatAmI;

    beforeEach(function() {
        whatAmI = jasmine.createSpy('whatAmI');

        whatAmI("I", "am", "a", "spy");
    });

    it("tracks that the spy was called", function() {
        expect(whatAmI).toHaveBeenCalled();
    });
});
```



`createSpyObj` takes in a list of strings as methods/properties of the spy object

```javascript
describe("Multiple spies, when created manually", function() {
    let tape;

    beforeEach(function() {
        tape = jasmine.createSpyObj(
            'tape',
            ['play', 'pause', 'stop', 'rewind']
        );

        tape.play();
        tape.pause();
        tape.rewind(0);
    });

    it("creates spies for each requested function", function() {
        expect(tape.play).toBeDefined();
        expect(tape.pause).toBeDefined();
        expect(tape.stop).toBeDefined();
        expect(tape.rewind).toBeDefined();
    });
});
```







## Routing and navigation

In a single page app, you change what your user sees without needing to hit the server again.

Angular `Router` enables navigation by interpreting a browser URL as an instruction to change the view.

This essentially gives the experience of going to a different URL but without needing to hit the server, giving the performance boost.



**Defining a basic route**

Import `Routes` and add to your `routes` array

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'first-component', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: '', redirectTo: '/first-component', pathMatch: 'full'},	// redirects to `first-component`
    { path: '**', component: PageNotFoundComponent }	// Wildcard route for a 404 page
];
```

Each element in `routes` array have 2 properties, `component` which is the Angular component to display, and `path` which is the path that can trigger the component.

You can also add optional property `title` for the title of the page

The order of elements in `routes` matter, as the framework will display the component associated with the first path that matches the current route.

You can add routes to your application say by using the `anchor` element, with `route-outlet` element as placeholder for where to display the component.

```html
<h1>Angular Router App</h1>
<nav>
	<ul>
        <li><a routerLink="/first-component" routerLinkActive="active" ariaCurrentWhenActive="page">First Component</a></li>
		<li><a routerLink="/second-component" routerLinkActive="active" ariaCurrentWhenActive="page">Second Component</a></li>
    </ul>
</nav>

<!-- The routed views render in the <router-outlet>-->
<router-outlet></router-outlet
```





**Relative paths**

If you want to go from `FirstComponent` to `Second Component` but they are at the same level, you can use the form `../` to indicate going back a level

```html
<h2>First Component</h2>

<nav>
  <ul>
    <li><a routerLink="../second-component">Relative Route to second component</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

You can also use

```typescript
goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```





**Parameters and fragments**

Getting parameters from the URL

```typescript
hero$: Observable<Hero>;

constructor(
  private route: ActivatedRoute,
  private router: Router  ) {}

ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
  this.hero$ = this.service.getHero(heroId);
}

gotoItems(hero: Hero) {
  const heroId = hero ? hero.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that item.
  this.router.navigate(['/heroes', { id: heroId }]);
}
```

```
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
```





**Location strategy**

When Router goes to a new component, it updates the URL and the new URL goes into the browser history. There are a few location strategies that specify how the URL changes.

HTML5 pushState

```
localhost:3002/crisis-center
```

Hash location strategy

```
localhost:3002/src/#/crisis-center
```





**Lazy loading**

Specify so Angular only loads routes as needed, not all at application launch.





**Preventing unauthorized access**

Use route guards to prevent users from navigating to parts of an application without authorization. The following route guards are available in Angular:

- [`canActivate`](https://angular.io/api/router/CanActivateFn)
- [`canActivateChild`](https://angular.io/api/router/CanActivateChildFn)
- [`canDeactivate`](https://angular.io/api/router/CanDeactivateFn)
- [`canMatch`](https://angular.io/api/router/CanMatchFn)
- [`resolve`](https://angular.io/api/router/ResolveFn)
- [`canLoad`](https://angular.io/api/router/CanLoadFn)

Put these guards in the objects of `routes` array.



















## Further learning



Questions on Angular:

- What is ng build?
- What is dependency injection?
- When you log in, how does the     security token work?
- How do pages store     information when you navigate them?
- What Angular version are you     using?





























