import { Component } from './baseComponent'
import { ProjectItem } from './projectItem'
import { AutoBind } from '../decorators/autobind'
import { DragTarget } from '../models/dragAndDrop'
import { Project, ProjectStatus } from '../models/project'
import { projectState } from '../state/projectState'

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = []

    constructor(private type: 'active' | 'finished') {
        super('projectList', 'app', false, `${type}Projects`)
        this.configure()
        this.renderContent()
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}ProjectsList`)! as HTMLUListElement
        listElement.innerHTML = ''
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, project)
        }
    }

    configure() { 
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active')
                    return project.status === ProjectStatus.Active

                return project.status === ProjectStatus.Finished
            })
            this.assignedProjects = relevantProjects 
            this.renderProjects()
        })
    }

    renderContent() {
        const listId = `${this.type}ProjectsList`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()

            const listElement = this.element.querySelector('ul')!
            listElement.classList.add('droppable')
        }
    }

    @AutoBind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain')
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')!
        listElement.classList.remove('droppable')
    }
}
