import React from "react";
import { FileCheck, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FileCheck,
    title: "Easy to Use",
    description: "Send and sign documents in just a few clicks. No training required.",
  },
  {
    icon: Shield,
    title: "Legally Binding",
    description: "Bank-level security with legally enforceable electronic signatures.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Close deals 80% faster with automated workflows and reminders.",
  },
  {
    icon: Users,
    title: "Collaborate Seamlessly",
    description: "Multiple signers, custom fields, and real-time tracking for teams.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            Why businesses choose us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your document signing process and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
