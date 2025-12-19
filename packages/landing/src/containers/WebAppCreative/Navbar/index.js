import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSession, signOut } from "next-auth/react";
import NavbarWrapper from "common/components/Navbar";
import Drawer from "common/components/Drawer";
import Button from "common/components/Button";
import Logo from "common/components/UIElements/Logo";
import Box from "common/components/Box";
import HamburgMenu from "common/components/HamburgMenu";
import Container from "common/components/UI/Container";
import { DrawerContext } from "common/contexts/DrawerContext";

import {
  menu_items,
  contact_menu_items,
  new_pages_menu_items,
} from "common/data/WebAppCreative";
import ScrollSpyMenu from "common/components/ScrollSpyMenu";

import logoImage from "common/assets/image/webAppCreative/logo.png";

const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter();
  const { status } = useSession();

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  // Use different menu items based on current page
  let currentMenuItems;
  if (
    [
      "/contact",
      "/privacy-policy",
      "/terms-of-service",
      "/sitemap",
      "/shipping-policy",
      "/cancellation-refunds",
      "/login",
    ].includes(router.pathname)
  ) {
    // For contact and new pages, use menu items that link to homepage sections
    currentMenuItems = new_pages_menu_items;
  } else {
    currentMenuItems = menu_items;
  }

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container width="1400px">
        <Box {...row}>
          <Logo
            href="/"
            logoSrc={logoImage}
            title="SaaS Creative"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Box {...menuWrapper} className="mainMenuWrapper">
            <ScrollSpyMenu
              className="main_menu"
              menuItems={currentMenuItems}
              offset={-70}
            />
            <Link
              href="/free-article"
              className="navbar_button navbar_button_two"
              style={{ marginLeft: "auto" }}
            >
              <Button {...button} title="Free Article" />
            </Link>
            {status === "authenticated" && (
              <Button
                {...button}
                title="Logout"
                colors="errorWithBg"
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{ marginLeft: 12 }}
              />
            )}
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#108AFF" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={currentMenuItems}
                drawerClose={true}
                offset={-100}
              />
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    className: "web_app_creative_navbar",
    minHeight: "70px",
    display: "block",
  },
  row: {
    flexBox: true,
    alignItems: "center",
    width: "100%",
  },
  logoStyle: {
    maxWidth: ["126px", "126px"],
  },
  button: {},
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default Navbar;
