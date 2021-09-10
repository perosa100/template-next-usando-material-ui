type MenuItemType = {
  title: string
  icon: {
    name: string
  }
  link?: {
    href: string
  }
  children?: {
    title: string
    link: {
      href: string
    }
  }[]
}

const items: MenuItemType[] = [
  {
    title: 'Dashboard',
    icon: { name: 'home' },
    link: { href: '/dashboard' }
  },
  /*   {
    title: 'FEATURES',
    group: true,
  }, */
  {
    title: 'Acelerador',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/acelerador/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/acelerador/listagem' }
      }
    ]
  },
  {
    title: 'ProdutoItem',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'buscaritem',
        link: { href: '/buscaritem/criacao' }
      }
    ]
  },

  {
    title: 'Advocacia',
    icon: { name: 'edit-2-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/advocacia/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/advocacia/listagem' }
      }
    ]
  },
  {
    title: 'Cobrança',
    icon: { name: 'keypad-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/cobranca/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/cobranca/listagem' }
      }
    ]
  },
  {
    title: 'Contabilidade',
    icon: { name: 'browser-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/contabilidade/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/contabilidade/listagem' }
      }
    ]
  },
  {
    title: 'Renogociação',
    icon: { name: 'text-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/renegociacao/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/renegociacao/listagem' }
      }
    ]
  },
  {
    title: 'Configurações',
    icon: { name: 'shuffle-2-outline' },
    children: [
      {
        title: 'Criacao',
        link: { href: '/configuracoes/criacao' }
      },

      {
        title: 'listagem',
        link: { href: '/configuracoes/listagem' }
      }
    ]
  }
]

export default items
