import React from "react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © 2025 eSignature Platform. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
