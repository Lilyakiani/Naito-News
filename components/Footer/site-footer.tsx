import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-20">
      <Separator className="mb-10" />

      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4 text-sm">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight">NAITO</h3>
            <p className="text-muted-foreground leading-relaxed">
              Modern news platform covering technology, business, politics,
              sports and entertainment.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <h4 className="font-semibold">Explore</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/?category=technology">Technology</Link></li>
              <li><Link href="/?category=business">Business</Link></li>
              <li><Link href="/?category=politics">Politics</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} NAITO  
              <br />
              All rights reserved.
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
        
        </p>
      </div>
    </footer>
  );
}
