export class debugConsole {
  masterElement: HTMLDivElement

  constructor() {
    this.masterElement = document.createElement('div')
    this.masterElement.classList.add("debugConsole")

    document.body.appendChild(this.masterElement)

  }

  addNumber(title: string, value: number, callback: Function): void {
    let container = document.createElement('div')
    let label = document.createElement('label')
    let number = document.createElement('input')
    label.innerText = title

    number.type = "number"
    number.value = value + ""

    number.addEventListener('change', () => {
      callback(parseFloat(number.value))
    })

    container.appendChild(label)
    container.appendChild(number)
    this.masterElement.appendChild(container)
  }

  addCheckbox(title: string, value: boolean, callback: Function): void {
    let container = document.createElement('div')
    let label = document.createElement('label')
    let checkbox = document.createElement('input')
    label.innerText = title

    checkbox.type = "checkbox"
    checkbox.checked = value

    checkbox.addEventListener('change', () => {
      callback(checkbox.checked)
    })

    container.appendChild(label)
    container.appendChild(checkbox)
    this.masterElement.appendChild(container)
  }
}
