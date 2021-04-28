import {
  Box, Typography, Link
} from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

import { Icon } from '@iconify/react';
import soundcloudIcon from '@iconify-icons/zmdi/soundcloud';
import discordIcon from '@iconify-icons/bi/discord';

import {
  StyledAvatar, StyledMediaContainer, StyledLogo,
  StyledCard, StyledCardContainer
} from './PersonInfoCardStyled';

export default function PersonInfoCard({ name, avatar, github, mail, soundcloud, discord }) {
  return (
    <StyledCard>
      <StyledCardContainer p={1.5} display="flex" flexDirection="column">
        <Box>
          <Typography gutterBottom
            style={{ fontSize: "1.5rem", fontFamily: "Bebas Neue" }}
          >
            {name}
          </Typography>
        </Box>
        <StyledMediaContainer flexBasis={100} flexGrow="0" display="flex"
          direction="row" flexWrap="wrap"
        >
          <Box flexGrow="1" pb={1.5}>
            {github?.link && github?.name &&
              <Typography variant="body2" style={{ fontSize: "1rem" }}
              >
                <GitHubIcon fontSize="inherit" /> GitHub:
                <Link aria-label={`Github account for ${github.name}`}
                  style={{ color: "#00D1B9" }} href={github.link}
                >
                  {github.name}
                </Link>
              </Typography>
            }
            {mail?.link && mail?.name &&
              <Typography variant="body2" style={{ fontSize: "1rem" }}>
                <EmailIcon fontSize="inherit" /> Mail:
                <Link aria-label={`Email for ${mail.name}`}
                  style={{ color: "#00D1B9" }} href={mail.link}
                >
                  {mail.name}
                </Link>
              </Typography>
            }
            {soundcloud?.link && soundcloud?.name &&
              <Typography variant="body2" style={{ fontSize: "1rem" }}>
                <Icon icon={soundcloudIcon} fontSize="inherit" />
                Soundcloud:
                <Link aria-label={`Soundcloud account for ${soundcloud.name}`}
                  style={{ color: "#00D1B9" }} href={soundcloud.link}
                >
                  {soundcloud.name}
                </Link>
              </Typography>
            }
            {discord?.name &&
              <Typography variant="body2" style={{ fontSize: "1rem" }}>
                <Icon icon={discordIcon} fontSize="inherit" />
                Discord: {discord.name}
              </Typography>
            }
          </Box>
          <StyledAvatar alt="Developer avatar" src={avatar} />
        </StyledMediaContainer>
        <Box flexGrow="1" />
        <Box display="flex" pt={1}>
          <StyledLogo src="/assets/ntnu-logo.png" />
        </Box>
      </StyledCardContainer>
    </StyledCard>
  );
}