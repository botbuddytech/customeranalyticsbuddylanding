import React from "react";
import { useRouter } from "next/router";
import Container from "common/components/UI/Container";
import { AdminWrapper, AdminShell, Sidebar, AdminContent } from "./admin.style";

const MENU_ITEMS = [
  {
    label: "Leads",
    path: "/admin/Leads",
    badge: "Active",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM10 6C7.79 6 6 7.79 6 10C6 12.21 7.79 14 10 14C12.21 14 14 12.21 14 10C14 7.79 12.21 6 10 6ZM10 12C8.9 12 8 11.1 8 10C8 8.9 8.9 8 10 8C11.1 8 12 8.9 12 10C12 11.1 11.1 12 10 12Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Queries",
    path: "/admin/queries",
    badge: "Active",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2V18H18V16H4V2H2ZM6 14H8V8H6V14ZM10 14H12V6H10V14ZM14 14H16V10H14V14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Contact Messages",
    path: "/admin/contactmessage",
    badge: "Active",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 3H16C16.55 3 17 3.45 17 4V16C17 16.55 16.55 17 16 17H4C3.45 17 3 16.55 3 16V4C3 3.45 3.45 3 4 3ZM5 5V15H15V5H5ZM6 7H14V9H6V7ZM6 10H11V12H6V10Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Subscription",
    path: "/admin/subscription",
    badge: "Active",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM10 6C7.79 6 6 7.79 6 10C6 12.21 7.79 14 10 14C12.21 14 14 12.21 14 10C14 7.79 12.21 6 10 6ZM10 12C8.9 12 8 11.1 8 10C8 8.9 8.9 8 10 8C11.1 8 12 8.9 12 10C12 11.1 11.1 12 10 12Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Blogs",
    path: "/admin/blogs",
    badge: "Active",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 3H16C16.55 3 17 3.45 17 4V16C17 16.55 16.55 17 16 17H4C3.45 17 3 16.55 3 16V4C3 3.45 3.45 3 4 3ZM5 5V15H15V5H5ZM6 7H14V9H6V7ZM6 10H11V12H6V10Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleNavigate = (path) => {
    if (router.pathname === path) return;
    router.push(path);
  };

  return (
    <AdminWrapper id="admin_section">
      <Container>
        <AdminShell>
          <Sidebar>
            <h3>Admin</h3>
            <ul>
              {MENU_ITEMS.map((item) => {
                const isActive = router.pathname === item.path;
                return (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      className={isActive ? "active" : ""}
                    >
                      <span className="label">
                        {item.icon}
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Sidebar>

          <AdminContent>{children}</AdminContent>
        </AdminShell>
      </Container>
    </AdminWrapper>
  );
};

export default AdminLayout;
