import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-discusiones-encuesta',
  templateUrl: './administrar-discusiones-encuesta.component.html',
  styleUrls: ['./administrar-discusiones-encuesta.component.scss']
})
export class AdministrarDiscusionesEncuestaComponent implements OnInit {
  shownMails = [
    {
      'from': {
        'name': 'Mccormick Hinton',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'est cillum magna',
      'content': 'Sint eiusmod pariatur veniam esse dolor exercitation in cillum sunt proident anim. Amet sunt it mollit ',
      'read': true,
      'starred': true,
      'labels': [
        {
          'name': 'Private',
          'color': 'darkgrey'
        }
      ],
      'group': 'promotions',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/1.jpg']
    },
    {
      'from': {
        'name': 'Rutledge Hammond',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'non non ex',
      'content': 'Exercitation Lorem laborum veniam ea fugiat esse fugiat commodo cupidatat. Laborum dolore labore quis consectetur ex.',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'social',
      'type': 'trash',
      'attachments': ['assets/img/backgrounds/2.jpg']
    },
    {
      'from': {
        'name': 'Vilma Russo',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'veniam ipsum irure',
      'content': 'Mollit voluptate ea nostrud minim deserunt laborum quis proident adipisicing culpa. Excepteur reprehenderit dolore non ',
      'read': true,
      'starred': false,
      'labels': [
      ],
      'group': 'promotions',
      'type': 'spam',
      'attachments': ['assets/img/backgrounds/1.jpg']
    },
    {
      'from': {
        'name': 'Blankenship Clarke',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'consectetur qui irure',
      'content': 'Ex labore culpa eu quis commodo nulla ',
      'read': true,
      'starred': true,
      'labels': [
        {
          'name': 'Project X',
          'color': '#4CA9BB'
        }
      ],
      'group': 'primary',
      'type': 'none',
      'attachments': ['assets/img/backgrounds/1.jpg']
    },
    {
      'from': {
        'name': 'Harper Deleon',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'ad laborum duis',
      'content': 'Dolore consequat',
      'read': true,
      'starred': false,
      'labels': [
      ],
      'group': 'primary',
      'type': 'spam',
      'attachments': ['assets/img/backgrounds/2.jpg']
    },
    {
      'from': {
        'name': 'Jimmie Hicks',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'do sit amet',
      'content': 'nulo',
      'read': true,
      'starred': false,
      'labels': [
        {
          'name': 'Priority!',
          'color': '#4BAE4F'
        }
      ],
      'group': 'promotions',
      'type': 'none',
      'attachments': ['assets/img/backgrounds/2.jpg']
    },
    {
      'from': {
        'name': 'Valentine Ray',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'nulla adipisicing consectetur',
      'content': 'nulo',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'social',
      'type': 'draft',
      'attachments': ['assets/img/backgrounds/2.jpg']
    },
    {
      'from': {
        'name': 'Kristi Burch',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'id ad qui',
      'content': 'nulo',
      'read': false,
      'starred': false,
      'labels': [
        {
          'name': 'Private',
          'color': '#4BAE4F'
        }
      ],
      'group': 'promotions',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Gay Herrera',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'tempor occaecat est',
      'content': 'nulo',
      'read': false,
      'starred': false,
      'labels': [
        {
          'name': 'Outreach',
          'color': 'darkgrey'
        }
      ],
      'group': 'primary',
      'type': 'spam',
      'attachments': ['assets/img/backgrounds/2.jpg']
    },
    {
      'from': {
        'name': 'Lynnette Williamson',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'quis ex elit',
      'content': 'nulo',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'primary',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Erna Clemons',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'nostrud minim veniam',
      'content': 'nulo',
      'read': true,
      'starred': true,
      'labels': [
        {
          'name': 'Private',
          'color': 'red'
        }
      ],
      'group': 'social',
      'type': 'trash',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Delia Robbins',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'qui et elit',
      'content': 'nulo',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'promotions',
      'type': 'spam',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Vicki Atkinson',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'id voluptate exercitation',
      'content': 'nulo',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'primary',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/1.jpg']
    },
    {
      'from': {
        'name': 'Marian Newman',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'adipisicing sint commodo',
      'content': 'culto',
      'read': true,
      'starred': false,
      'labels': [
      ],
      'group': 'social',
      'type': 'spam',
      'attachments': ['assets/img/backgrounds/1.jpg']
    },
    {
      'from': {
        'name': 'Foley Prince',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'occaecat et eiusmod',
      'content': 'nulo',
      'read': true,
      'starred': true,
      'labels': [
      ],
      'group': 'social',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Shaw Sanford',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'eu magna ut',
      'content': 'magia',
      'read': false,
      'starred': false,
      'labels': [
      ],
      'group': 'social',
      'type': 'none',
      'attachments': ['assets/img/backgrounds/2.jpg', 'assets/img/backgrounds/3.jpg']
    },
    {
      'from': {
        'name': 'Fernandez Wilcox',
        'mail': 'demo@justademomail.com'
      },
      'subject': 'ut aliqua reprehenderit',
      'content': 'Dolor ',
      'read': false,
      'starred': true,
      'labels': [
      ],
      'group': 'promotions',
      'type': 'sent',
      'attachments': ['assets/img/backgrounds/2.jpg']
    }
  ];
  constructor() { }

  ngOnInit() {
  }


  toggleSelectAllThreads() {
    console.log('evento para seleccionar todos los elementos de mi encuesta');
  }

  isSelected(mail) {
    console.log('mail');
  }


}
