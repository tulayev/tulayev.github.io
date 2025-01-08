import { Component } from './baseComponent'
import { AutoBind } from '../decorators/autobind'
import { Draggable } from '../models/dragAndDrop'
import { Project } from '../models/project'

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    get persons() {
        if (this.project.people === 1)
            return '1 person'
        else
            return `${this.project.people} persons`
    }
    
    constructor(hostId: string, private project: Project) {
        super('singleProject', hostId, false, project.id) 
        this.configure()
        this.renderContent()
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
        this.element.querySelector('p')!.textContent = this.project.description
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id)
        event.dataTransfer!.effectAllowed = 'move'
    }

    dragEndHandler(_: DragEvent) {
        console.log('Drag End')
    }
}
