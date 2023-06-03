interface ContentProps {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: 'published' | 'draft' | 'deleted';
  source_url: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  deleted_at: string | null;
  tabcoins: number;
  owner_username: string;
  children_deep_count: number;
}

interface APIErrorProps {
  action: string;
  error_id: string;
  message: string;
  name: string;
  status_code: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  notifications: boolean;
  features: string[];
  tabcoins: number;
  tabcash: number;
  created_at: string;
  updated_at: string;
}

interface FavoriteProps {
  owner_username: string;
  slug: string;
  id: string;
}

interface HeaderProps {
  title: string;
}
export { ContentProps, APIErrorProps, User, FavoriteProps,HeaderProps };
