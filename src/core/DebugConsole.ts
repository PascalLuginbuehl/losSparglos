export class DebugConsole {
  masterElement: HTMLDivElement

  constructor() {
    this.masterElement = document.createElement('div')
    this.masterElement.classList.add("debugConsole")

    document.body.appendChild(this.masterElement)

  }

  addNumber(title: string, value: number, callback: (newNumber: number) => void): void {
    let container = document.createElement('div')
    let label = document.createElement('label')
    let numberInput = document.createElement('input')
    label.innerText = title

    numberInput.type = "number"
    numberInput.value = value + ""

    numberInput.addEventListener('change', () => {
      callback(parseFloat(numberInput.value))
    })

    container.appendChild(label)
    container.appendChild(numberInput)
    this.masterElement.appendChild(container)
  }

  addCheckbox(title: string, value: boolean, callback: (newBoolean: boolean) => void): void {
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
