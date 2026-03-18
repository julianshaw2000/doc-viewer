import { Component, input, output } from '@angular/core';
import { DocEntry } from '../models/document.model';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styles: ``,
})
export class Sidebar {
  documents = input<DocEntry[]>([]);
  selectedFilename = input<string | null>(null);
  collapsed = input(false);
  documentSelected = output<DocEntry>();
  toggleCollapse = output<void>();

  selectDocument(doc: DocEntry): void {
    this.documentSelected.emit(doc);
  }

  onToggle(): void {
    this.toggleCollapse.emit();
  }
}
