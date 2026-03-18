import { Component, input } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-viewer',
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './viewer.html',
  styles: ``,
})
export class Viewer {
  pdfSrc = input<string | null>(null);
  title = input<string | null>(null);
}
