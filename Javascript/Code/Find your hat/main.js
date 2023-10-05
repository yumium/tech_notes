const prompt = require('prompt-sync')({sigint: true});

const h = '^';
const o = 'O';
const f = '░';
const p = '*';


//Pre: Assumes the input field (array of array) is valid
//  1. It's non-empty
//  2. It's of rectangular dimensions
//  3. The starting point is at the top left
//  4. There is a hat, one or more holes, and the rest are all fields
class Field {
  constructor(arrs) {
    this._field = arrs
    this._width = arrs[0].length
    this._height = arrs.length

    this._isOngoing = true
    this._chars = {
        h: '^',
        o: 'O',
        f: '░',
        p: '*'
      }
    this._pos = [0,0]   //current position, (x,y)
  }

  get field() {return this._field}

  get width() {return this._width}

  get height() {return this._height}

  get isOngoing() {return this._isOngoing}

  set isOngoing(bool) {this._isOngoing = bool}

  get chars() {return this._chars}

  get pos() {return this._pos}

  set pos(newpos) {this._pos = newpos}

  move (dir) {
    const nextpos = this.pos.slice()
    switch (dir) {
        case "l":
            nextpos[0] -= 1
            break;
        case "r":
            nextpos[0] += 1
            break;
        case "u":
            nextpos[1] -= 1
            break;
        case "d":
            nextpos[1] += 1
            break;
        default:
            console.log("Invalid move input, please enter l, r, u, or d.")
    }

    if (nextpos !== this.pos) {
        switch (true) {
            case nextpos[0] < 0 || nextpos[0] >= this.width || nextpos[1] < 0 || nextpos[1] >= this.height:
                console.log("You left the board.")
                this.isOngoing = false
                break;

            case this.field[nextpos[1]][nextpos[0]] === this.chars.h:
                console.log("You found the hat. You win!")
                this.isOngoing = false
                break;

            case this.field[nextpos[1]][nextpos[0]] === this.chars.o:
                console.log("You fell into a hole. You lose!")
                this.isOngoing = false
                break;

            case (this.field[nextpos[1]][nextpos[0]] === this.chars.f):
                this._field[nextpos[1]][nextpos[0]] = this.chars.p
                this.pos = nextpos
                break;

            case this.field[nextpos[1]][nextpos[0]] === this.chars.p:
                console.log("You cannot turn back!")
                break;

            default:
                console.log("Failed to match")
                break;
        }
    }
  }

  print () {
    const joinInner = this.field.map(arr => arr.join(""))
    const joinOuter = joinInner.join("\n")
    console.log(joinOuter)
  }

  //Pre: 0 <= percentage < 0.5
  static generateField (width, height, percentageHoles) {
    const newArr = new Array(width * height)
    
    for (let i = 0; i < newArr.length; i++) newArr[i] = '░'
    newArr[0] = '*'

    const randoms = this._randNums(Math.floor(percentageHoles * newArr.length), newArr.length-1)
    randoms.forEach(val => newArr[val] = 'O')

    //finally, add the hat
    let hatIndex;
    do {
        hatIndex = Math.floor(Math.random() * newArr.length)
    } while (newArr.findIndex(val => val === hatIndex) !== -1)
    newArr[hatIndex] = '^'

    return this._splitBy(width,newArr)
  }

  //Generate an array of *amount* distinct random integers between [1..upperBound]
  //Requires 0 <= *amount* <= upperBound
  static _randNums (amount, upperBound) {
    const prev = []

    for (let count = amount; count > 0; count--) {
        let random;
        do {
            random = Math.floor(Math.random() * upperBound) + 1
        } while (prev.findIndex(num => num === random) !== -1)
        prev.push(random)
    }

    return prev
  }

  //Splits an array into array of arrays specificed by *size*
  //eg. a = [1,2,3,4,5,6]
  // splitBy (2,a)
  // a = [[1,2],[3,4],[5,6]]
  //Side effects: The input array is deleted!
  static _splitBy (size, arr) {
    const newArr = []
    
    while (arr.length > 0) {
        newArr.push(arr.splice(0,size))
    }

    return newArr
  }
}

/*
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
*/

const myField = new Field(Field.generateField(30,10,0.2))

while (myField.isOngoing) {
    myField.print()
    const dir = prompt("Where would you go next?")
    myField.move(dir)
}

//const name = prompt("What is your name? ")
//console.log(`Hello there, ${name}`)

