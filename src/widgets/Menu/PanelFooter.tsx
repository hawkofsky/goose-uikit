import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon, FsxuRoundIcon, WhirlRoundIcon, CogIcon, SvgProps } from "../../components/Svg";
import Text from "../../components/Text/Text";
import Flex from "../../components/Flex/Flex";
import Dropdown from "../../components/Dropdown/Dropdown";
import Link from "../../components/Link/Link";
import Skeleton from "../../components/Skeleton/Skeleton";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import MenuButton from "./MenuButton";
import * as IconModule from "./icons";
import { socials, MENU_ENTRY_HEIGHT } from "./config";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon, LanguageIcon } = Icons;

const Container = styled.div`
  flex: none;
  padding: 8px 4px 42px 4px;
  // background-color: ${({ theme }) => theme.nav.background};
  // border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SettingsEntry = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
  float: right;
`;

const SocialEntry = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
  float: left;
`;

const Divider = styled.div`
  background-color: #ffffff;
  height: 3px;
  margin: 20px auto;
  width: 90%;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  // cakePriceUsd,
  fsxuPriceUsd,
  whirlPriceUsd,
  currentLang,
  langs,
  setLang,
  // priceLink,
  fsxuPriceLink,
  whirlPriceLink,
}) => {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <Flex style={{ justifyContent: "flex-end", width: "90%" }}>
        {socials.map((social, index) => {
          const Icon = Icons[social.icon];
          const iconProps = { width: "24px", color: "white", style: { cursor: "pointer" } };
          const mr = index < socials.length - 1 ? "8px" : 0;
          if (social.items) {
            return (
              <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
                {social.items.map((item) => (
                  <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                    {item.label}
                  </Link>
                ))}
              </Dropdown>
            );
          }
          return (
            <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
              <Icon {...iconProps} />
            </Link>
          );
        })}
      </Flex>
      <Divider />
      <SocialEntry>
        {/* {cakePriceUsd ? (
          <PriceLink href={priceLink} target="_blank">
            <PancakeRoundIcon width="24px" mr="8px" />
            <Text color="textSubtle" bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
          </PriceLink>
        ) : (
          <Skeleton width={80} height={24} />
        )} */}
        <div>
          {fsxuPriceUsd ? (
            <PriceLink href={fsxuPriceLink} target="_blank">
              <FsxuRoundIcon width="24px" mr="8px" />
              <Text color="white" bold style={{fontSize: '20px'}}>{`$${fsxuPriceUsd.toFixed(5)}`}</Text>
            </PriceLink>
          ) : (
            <Skeleton width={80} height={24} />
          )}
          {whirlPriceUsd ? (
            <PriceLink href={whirlPriceLink} target="_blank">
              <WhirlRoundIcon width="24px" mr="8px" />
              <Text color="white" bold style={{fontSize: '20px'}}>{`$${whirlPriceUsd.toFixed(5)}`}</Text>
            </PriceLink>
          ) : (
            <Skeleton width={80} height={24} />
          )}
        </div>
      </SocialEntry>
      <SettingsEntry>
        <Button variant="text" size="sm" onClick={() => toggleTheme(!isDark)} style={{display: "list-item", border: "2px solid #ffffff", marginBottom: "3px"}}>
          {/* alignItems center is a Safari fix */}
          <Flex alignItems="center">
            <SunIcon color={isDark ? "gray" : "white"} width="24px" />
            <Text color="textDisabled" mx="4px">
              /
            </Text>
            <MoonIcon color={isDark ? "white" : "gray"} width="24px" />
          </Flex>
        </Button>
        <Button variant="text" size="sm" onClick={() => setLang(currentLang?.toUpperCase() === 'EN' ? {code: 'zh-CN', language: '简体中文'} : {code: 'en', language: 'English'})} style={{display: "list-item", border: "2px solid #ffffff"}}>
          {/* alignItems center is a Safari fix */}
          <Flex alignItems="center">
            <Text color={currentLang?.toUpperCase() === 'EN' ? "gray" : "white"} onClick={() => setLang({code: 'en', language: 'English'})}>文</Text>
            <Text color="textDisabled" mx="4px">
              &nbsp;/&nbsp;
            </Text>
            <Text color={currentLang?.toUpperCase() === 'EN' ? "white" : "gray"} onClick={() => setLang({code: 'zh-CN', language: '简体中文'})}>EN</Text>
          </Flex>
        </Button>
        {/* <Dropdown
          position="top-right"
          target={
            <Button variant="text" startIcon={<LanguageIcon color="textSubtle" width="24px" />}>
              <Text color="textSubtle">{currentLang?.toUpperCase()}</Text>
            </Button>
          }
        >
          {langs.map((lang) => (
            <MenuButton
              key={lang.code}
              fullWidth
              onClick={() => setLang(lang)}
              // Safari fix
              style={{ minHeight: "32px", height: "auto" }}
            >
              {lang.language}
            </MenuButton>
          ))}
        </Dropdown> */}
      </SettingsEntry>
    </Container>
  );
};

export default PanelFooter;
