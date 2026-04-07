export class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _completed: boolean;
  private _createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    completed: boolean = false,
    createdAt: Date = new Date(),
  ) {
    if (!title || title.trim() === "") {
      throw new Error("Task title cannot be empty.");
    }
    this._id = id;
    this._title = title;
    this._description = description;
    this._completed = completed;
    this._createdAt = createdAt;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get completed(): boolean {
    return this._completed;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  markAsCompleted(): void {
    this._completed = true;
  }

  updateDetails(title: string, description: string): void {
    if (!title || title.trim() === "") {
      throw new Error("Task title cannot be empty.");
    }
    this._title = title;
    this._description = description;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}
