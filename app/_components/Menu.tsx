'use client';

import { useState } from "react";

export function Memu() {
  const [isShow, setShow] = useState(false)

  const data = {
    Capabilities: [
      {
        label: 'CNC Machining',
        link: '/capabilities/cnc-machining',
      },
      {
        label: 'Sheet Metal Fabrication',
        link: '/capabilities/sheet-metal-fabrication',
      },
      {
        label: 'Amet dignissimos libero.',
        link: '/capabilities/sheet-metal-fabrication',
      },
    ],
    Solutions: [
      {
        label: 'Amet cum voluptates sit voluptatem. ',
        link: '/solutions/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '2Amet cum voluptates sit voluptatem. ',
        link: '/solutions/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '3Amet cum voluptates sit voluptatem. ',
        link: '/solutions/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '4Amet cum voluptates sit voluptatem. ',
        link: '/solutions/amet-cum-voluptates-sit-voluptatem'
      },
    ],
    Stamping: [
      {
        label: 'Amet cum voluptates sit voluptatem. ',
        link: '/stamping/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '2Amet cum voluptates sit voluptatem. ',
        link: '/stamping/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '3Amet cum voluptates sit voluptatem. ',
        link: '/stamping/amet-cum-voluptates-sit-voluptatem'
      },
      {
        label: '4Amet cum voluptates sit voluptatem. ',
        link: '/stamping/amet-cum-voluptates-sit-voluptatem'
      },

    ],
    About: {
      label: 'About',
      link: '/about',
    }
  }
  return (
    <div>

    </div>
  )
}
