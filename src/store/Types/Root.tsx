import { ComponentClass, FunctionComponent } from 'react';
import { Icon } from 'iconsax-react';

// ==============================|| TYPES - ROOT  ||============================== //

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

// `OverrideIcon` türü sadece React bileşenleri ve third-party ikon bileşenlerini destekler
export type OverrideIcon =
  | ComponentClass<any> // React class bileşenleri
  | FunctionComponent<any> // React fonksiyon bileşenleri
  | Icon; // third-party ikon bileşenleri

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}
