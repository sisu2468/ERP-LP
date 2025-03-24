export interface NavItem {
  title: string;
  path: string;
  description: string;
}

export interface CTACard {
  title: string;
  description: string;
  icon: React.ElementType;
  buttonText: string;
  buttonLink: string;
  features?: string[];
  primary?: boolean;
}