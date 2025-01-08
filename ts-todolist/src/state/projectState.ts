import { Project, ProjectStatus } from '../models/project'

type Listener<T> = (items: T[]) => void

class State<T> {
    protected listeners: Listener<T>[] = []

    addListener(listenerFunction: Listener<T>) {
        this.listeners.push(listenerFunction)
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance)
            return this.instance 

        this.instance = new ProjectState()
        return this.instance
    }

    private updateListeners() {
        for (const listenerFunction of this.listeners) {
            listenerFunction(this.projects.slice())
        }
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject)
        this.updateListeners()
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId)
        
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }
}

export const projectState = ProjectState.getInstance()
