import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Viewer } from '../viewer/viewer';
import { DocumentService } from '../services/document.service';
import { AuthService } from '../services/auth.service';
import { DocEntry } from '../models/document.model';

@Component({
  selector: 'app-shell',
  imports: [Sidebar, Viewer],
  templateUrl: './shell.html',
  styles: ``,
})
export class Shell implements OnInit {
  documents = signal<DocEntry[]>([]);
  selectedDoc = signal<DocEntry | null>(null);
  pdfSrc = signal<string | null>(null);
  sidebarCollapsed = signal(false);
  username: string | null;

  constructor(
    private documentService: DocumentService,
    private auth: AuthService,
    private router: Router
  ) {
    this.username = this.auth.getUsername();
  }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe({
      next: (docs) => this.documents.set(docs),
      error: (err) => console.error('Failed to load documents:', err)
    });
  }

  onDocumentSelected(doc: DocEntry): void {
    this.selectedDoc.set(doc);
    this.pdfSrc.set(`assets/docs/${doc.filename}`);
  }

  onToggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
