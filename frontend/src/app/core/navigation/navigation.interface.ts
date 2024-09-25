export interface INavigationLink {
  label: string;
  params?: Record<string, unknown>;
  route: string;
}
