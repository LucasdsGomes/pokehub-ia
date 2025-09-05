// components/MenuOptionCard.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface MenuOptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  delay: string;
}

export default function MenuOptionCard({
  title,
  description,
  icon: IconComponent,
  color,
  hoverColor,
  delay,
}: MenuOptionCardProps) {
  return (
    <div
      className="group relative animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div
        className={`relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl cursor-pointer ${hoverColor}`}
      >
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-r ${color} blur-xl -z-10 transition-opacity duration-500`}
        />
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${color} shadow-lg group-hover:rotate-12 transition-transform duration-500`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <IconComponent className="w-6 h-6 text-yellow-400" />
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />
      </div>
    </div>
  );
}
