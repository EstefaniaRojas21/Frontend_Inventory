import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss']
})
export class MenuComponent {
  isCollapsed = false;

  menuItems = [
    { 
      path: '/inventory', 
      label: 'Inventario', 
      icon: '📦',
      description: 'Gestión de productos'
    },
    { 
      path: '/categorias', 
      label: 'Categorías', 
      icon: '🏷️',
      description: 'Organizar categorías'
    },
    { 
      path: '/proveedores', 
      label: 'Proveedores', 
      icon: '🏢',
      description: 'Gestión de proveedores'
    },
    { 
      path: '/sales', 
      label: 'Ventas', 
      icon: '💰',
      description: 'Registro de ventas'
    },
    { 
      path: '/payment', 
      label: 'Métodos de Pago', 
      icon: '💳',
      description: 'Configurar pagos'
    },
    { 
      path: '/salesItems', 
      label: 'Items de Venta', 
      icon: '🛒',
      description: 'Productos en venta'
    },
    { 
      path: '/orders', 
      label: 'Órdenes', 
      icon: '📋',
      description: 'Pedidos y órdenes'
    }
  ];

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}