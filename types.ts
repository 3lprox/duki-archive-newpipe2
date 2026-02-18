import React from 'react';

export enum MediaType {
  VIDEO = 'video',
  AUDIO = 'audio',
  SUBTITLE = 'subtitle'
}

export enum MediaCategory {
  OFFICIAL = 'Oficial',
  LOST_MEDIA = 'Lost Media',
  OPTIMIZED = 'Optimizado',
  SUBTITLE = 'Subtítulo',
  CRO = 'C.R.O',
  DUKI = 'Duki',
  LEAKED = 'Filtradas'
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  category: MediaCategory | MediaCategory[];
  format: string;
  size?: string;
  artist?: string;
  album?: string;
  subtitleUrl?: string;
  coverUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}