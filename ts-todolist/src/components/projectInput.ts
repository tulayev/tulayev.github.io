import { Component } from './baseComponent'
import { AutoBind } from '../decorators/autobind'
import { projectState } from '../state/projectState'
import { Validatable, isValid } from '../utils/validation'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('projectInput', 'app', true, 'userInput')
        this.configure()
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    }

    private sendFormData(): [string, string, number] | void {
        const title = this.titleInputElement.value
        const description = this.descriptionInputElement.value
        const people = this.peopleInputElement.value 

        const titleValidatable: Validatable = {
            value: title,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5
        }

        if (!isValid(titleValidatable) || !isValid(descriptionValidatable) || !isValid(peopleValidatable)) {
            alert('Invalid input! Please, try again.')
            return
        } else {
            return [title, description, +people]
        }
    }

    private resetForm() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault()

        console.log(this);
        const formData = this.sendFormData()
        

        if (Array.isArray(formData)) {
            const [title, description, people] = formData
            projectState.addProject(title, description, people)
            this.resetForm()
        }
    }

    public configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    public renderContent() {}
}
