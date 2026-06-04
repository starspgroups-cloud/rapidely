import { ReactNode } from 'react';
import MobileTopBar from './MobileTopBar';
import BottomTabBar from './BottomTabBar';
import CartDrawer from './CartDrawer';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-app text-white">
      <MobileTopBar />
      <div className="mx-auto min-h-[calc(100dvh-4.5rem)] w-full max-w-[480px] bg-transparent pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-3 sm:max-w-2xl md:max-w-5xl lg:max-w-7xl">
        {children}
      </div>
      <BottomTabBar />
      <CartDrawer />
    </div>
  );
}
