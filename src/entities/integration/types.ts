export interface IntegrationGroup {
  id: number;
  name: string;
}

export interface Integration {
  id: number;
  name: string;
  url: string | null;
  description: string | null;
  logoImage: string | null;
  isActive: boolean;
  groupId: number;
  group: IntegrationGroup;
}

export interface IntegrationGroupWithItems extends IntegrationGroup {
  integrations: Integration[];
}
