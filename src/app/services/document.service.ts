import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocEntry } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private basePath = 'assets/docs';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<DocEntry[]> {
    return this.http.get<DocEntry[]>(`${this.basePath}/documents.json`);
  }

  getDocumentContent(filename: string): Observable<string> {
    return this.http.get(`${this.basePath}/${filename}`, { responseType: 'text' });
  }
}
