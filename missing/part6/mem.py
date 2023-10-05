@profile
def myfunc():
    a = [1] * (10 ** 6) # 100,000 entries
    b = [2] * (2 * 10 ** 7) # 2M entries
    del b
    return a

if __name__ == "__main__":
    myfunc()

