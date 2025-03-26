export interface NavItem {
  title: string;
  path: string;
  description: string;
  subMenu?: NavItem[];
}

export interface CTACard {
  title: string;
  description: string;
  icon: React.ElementType;
  buttonText: string;
  buttonLink: string;
  features?: Feature[];
  primary?: boolean;
}

export interface Feature {
  text: string;
}