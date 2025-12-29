'use client'; // این خط بسیار مهم است

import Galaxy from '../Backgrounds/Galaxy';
import { Hero } from '../home/Hero';
import LogoLoop from '../ui/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  {
    node: <SiTypescript />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
];

export const Header = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '75vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* لایه پس‌زمینه: گلکسی */}
      <div className="absolute inset-0 z-0">
        <Galaxy density={0.8} transparent={false} />
      </div>

      {/* لایه محتوا: Hero */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none">
        {/* pointer-events-none باعث می‌شود ماوس از روی این لایه عبور کند و به گلکسی برسد */}
        <div className="pointer-events-auto">
          {/* pointer-events-auto باعث می‌شود دکمه‌های داخل Hero کار کنند */}
          <Hero />
        </div>
      </div>

      {/* لایه لوگوها */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          width: '100%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={20}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};
