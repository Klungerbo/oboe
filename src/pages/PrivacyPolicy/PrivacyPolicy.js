import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { StyledLink } from './PrivacyPolicyStyled';

/**
 * Generated and adapted from:
 * https://www.privacypolicyonline.com/privacy-policy-generator/
 */
export default function TermsAndConditions() {
  return (
    <>
      <Helmet><title>Oboe - Privacy</title></Helmet>
      <Container>
        <Typography variant="h1" id="main-content">Privacy Policy for Oboe</Typography>
        <Typography paragraph>
          At Oboe, accessible from https://oboe.klungerbo.com
          and https://www.oboe.klungerbo.com, one of our main priorities is the
          privacy of our visitors. This Privacy Policy document contains types of
          information that is collected and recorded by Oboe and how we use it.
      </Typography>

        <Typography paragraph>
          If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to <StyledLink
            component={RouterLink} to="/contact"
          >
            contact us
          </StyledLink>.
      </Typography>

        <Typography paragraph>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in Oboe. This policy is not applicable to any
          information collected offline or via channels other than this website.
      </Typography>

        <Typography variant="h2">Consent</Typography>
        <Typography paragraph>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
      </Typography>

        <Typography variant="h2">Information we collect</Typography>
        <Typography paragraph>
          The personal information that you are asked to provide, and the reasons
          why you are asked to provide it, will be made clear to you at the point
          we ask you to provide your personal information.
      </Typography>
        <Typography paragraph>
          If you contact us directly, we may receive additional information about
          you such as your name, email address, phone number, the contents of the
          message and/or attachments you may send us, and any other information
          you may choose to provide.
      </Typography>
        <Typography paragraph>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address, email
          address, and telephone number.
      </Typography>

        <Typography variant="h2">How we use your information</Typography>
        <Typography paragraph>
          We use the information we collect in various ways, including to:
      </Typography>

        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Communicate with you to provide you with updates and other
          information relating to the website</li>
          <li>Send you emails</li>
        </ul>

        <Typography variant="h2">Log Files</Typography>

        <Typography paragraph>
          Oboe follows a standard procedure of using log files. These files log
          visitors when they visit websites. All hosting companies do this and a
          part of hosting services' analytics. The information collected by log
          files include internet protocol (IP) addresses, browser type, Internet
          Service Provider (ISP), date and time stamp, referring/exit pages, and
          possibly the number of clicks. These are not linked to any information
          that is personally identifiable. The purpose of the information is for
          analyzing trends, administering the site, tracking users' movement on
          the website, and gathering demographic information.
      </Typography>

        <Typography variant="h2">Cookies</Typography>
        <Typography paragraph>
          Like any other website, Oboe uses 'cookies'. These cookies are used to
          store your login sessions.
      </Typography>

        <Typography paragraph>
          For more general information on cookies, please read <StyledLink
            href="https://www.privacypolicyonline.com/what-are-cookies/"
          >"What Are Cookies" from Cookie Consent
        </StyledLink>.
          </Typography>

        <Typography variant="h2">GDPR Data Protection Rights</Typography>

        <Typography paragraph>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
      </Typography>

        <Typography paragraph>
          The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
      </Typography>
        <Typography paragraph>
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
      </Typography>
        <Typography paragraph>
          The right to erasure – You have the right to request that we erase your
          personal data, under certain conditions.
      </Typography>
        <Typography paragraph>
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.
      </Typography>
        <Typography paragraph>
          The right to object to processing – You have the right to object to our
          processing of your personal data, under certain conditions.
      </Typography>
        <Typography paragraph>
          The right to data portability – You have the right to request that we
          transfer the data that we have collected to another organization, or
          directly to you, under certain conditions.
      </Typography>
        <Typography paragraph>
          If you make a request, we have one month to respond to you. If you
          would like to exercise any of these rights,
        please <StyledLink component={RouterLink} to="/contact">contact us.</StyledLink>
        </Typography>

        <Typography variant="h2">CCPA Privacy Rights (Do Not Sell My Personal Information)</Typography>
        <Typography paragraph>
          Under the CCPA, among other rights, California consumers have the right to:
      </Typography>
        <Typography paragraph>
          Request that a business that collects a consumer's personal data
          disclose the categories and specific pieces of personal data that a
          business has collected about consumers.
      </Typography>
        <Typography paragraph>
          Request that a business delete any personal data about the consumer
          that a business has collected.
      </Typography>
        <Typography paragraph>
          Request that a business that sells a consumer's personal data, not sell
          the consumer's personal data.
      </Typography>
        <Typography paragraph>
          If you make a request, we have one month to respond to you. If you would
          like to exercise any of these rights,
       please <StyledLink component={RouterLink} to="/contact">contact us</StyledLink>.
      </Typography>

        <Typography variant="h2">COPPA Children's Information</Typography>
        <Typography paragraph>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
      </Typography>

        <Typography paragraph>
          Oboe does not knowingly collect any Personal Identifiable Information
          from children under the age of 13. If you think that your child
          provided this kind of information on our website, we strongly
        encourage you to <StyledLink component={RouterLink} to="/contact">
            contact us
          </StyledLink> immediately and we will do our best efforts
        to promptly remove such information from our records.
      </Typography>
      </Container>
    </>
  )
}
