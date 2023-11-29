import { Injectable, ApplicationRef, Injector, Type, ComponentRef, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  printComponent<T>(component: Type<T>, viewContainerRef: ViewContainerRef, inputs: { [key: string]: any } = {}): void {
    // Créer une instance du composant
    const componentRef: ComponentRef<T> = viewContainerRef.createComponent(component);

    // Assigner les @Inputs
    if (inputs && componentRef.instance) {
      for (const [key, value] of Object.entries(inputs)) {
        (componentRef.instance as any)[key] = value;
      }
    }

    // Récupérer le HTML
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    const html = domElem.innerHTML;

    // Ouvrir une nouvelle fenêtre et imprimer le HTML
    this.printHtml(html);

    // Détacher et détruire le composant
    viewContainerRef.clear();
  }

  printHtml(html: string, style?: string): void {
    let printWindow = window.open('', '_blank');

    if (!printWindow) {
      return;
    }

    printWindow.document.write(style + html);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    };
  }
}
