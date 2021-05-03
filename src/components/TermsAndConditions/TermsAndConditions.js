import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { StyledLink } from './TermsAndConditionsStyled';

/**
 * Generated and adapted from:
 * https://www.termsandconditionsgenerator.com
 */
export default function TermsAndConditions() {
  return (
    <Container>
      <Typography variant="h1">Terms and Conditions</Typography>

      <Typography paragraph>Welcome to Oboe!</Typography>
      <Typography paragraph>
        These terms and conditions outline the rules and regulations for the 
        use of Oboe's Website, located at https://oboe.klungerbo.com and 
        https://www.oboe.klungerbo.com.
      </Typography>

      <Typography paragraph>
        By accessing this website, we assume you accept these terms and 
        conditions. Do not continue to use Oboe if you do not agree to take 
        all of the terms and conditions stated on this page.
      </Typography>

      <Typography variant="h2">Cookies</Typography>
      <Typography paragraph>
        We employ the use of cookies. By accessing Oboe, you agreed to use 
        cookies in agreement with the <StyledLink component={RouterLink} to="/privacy">
        Oboe's Privacy Policy</StyledLink>. 
      </Typography>

      <Typography paragraph>
        Most interactive websites use cookies to let us retrieve the user’s 
        details for each visit. Cookies are used by our website to enable the 
        functionality of certain areas to make it easier for people visiting 
        our website. 
      </Typography>

      <Typography variant="h2">License</Typography>
      <Typography paragraph>
        Unless otherwise stated, Oboe and/or its licensors own the intellectual 
        property rights for all material on Oboe. All intellectual property 
        rights are reserved. You may access this from Oboe for your own 
        personal use subjected to restrictions set in these terms and conditions.
      </Typography>

      <Typography paragraph>You must not:</Typography>
      <ul>
        <li>Republish material from Oboe</li>
        <li>Sell, rent or sub-license material from Oboe</li>
        <li>Reproduce, duplicate or copy material from Oboe</li>
        <li>Redistribute content from Oboe</li>
      </ul>

      <Typography variant="h3">Your content</Typography>
      <Typography paragraph>
        You own the intellectual property rights to all the content generated 
        and uploaded by you. Oboe does, however, reserve the right to monitor 
        all content and to remove any content which can be considered 
        inappropriate, offensive or causes breach of these Terms and Conditions.
      </Typography>

      <Typography paragraph>You warrant and represent that:</Typography>
      <ul>
        <li>You are entitled to post content on our website and have all necessary licenses and consents to do so;</li>
        <li>The content does not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
        <li>The content will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
      </ul>

      <Typography variant="h2">Content Liability</Typography>
      <Typography paragraph>
        We shall not be held responsible for any content that appears on your 
        Website. You agree to protect and defend us against all claims that is 
        rising on your Website. No link(s) should appear on any Website that 
        may be interpreted as libelous, obscene or criminal, or which infringes, 
        otherwise violates, or advocates the infringement or other violation of, 
        any third party rights.
      </Typography>

      <Typography variant="h2">Your Privacy</Typography>
      <Typography paragraph>Please read our <StyledLink component={RouterLink} to="/privacy">
        Privacy Policy</StyledLink>
      </Typography>

      <Typography variant="h2">Reservation of Rights</Typography>
      <Typography paragraph>
        We reserve the right to request that you remove all links or any 
        particular link to our Website. You approve to immediately remove all 
        links to our Website upon request. We also reserve the right to amen 
        these terms and conditions and it’s linking policy at any time. By 
        continuously linking to our Website, you agree to be bound to and 
        follow these linking terms and conditions.
      </Typography>

      <Typography variant="h2">Disclaimer</Typography>
      <Typography paragraph>
        The information contained in this website is for general information 
        purposes only. The information is provided by Oboe and while we 
        endeavour to keep the information up to date and correct, 
        we make no representations or warranties of any kind, express or 
        implied, about the completeness, accuracy, reliability, suitability or 
        availability with respect to the website or the information, products, 
        services, or related graphics contained on the website for any purpose. 
        Any reliance you place on such information is therefore strictly at your 
        own risk.
      </Typography>

      <Typography paragraph>
        In no event will we be liable for any loss or damage including without 
        limitation, indirect or consequential loss or damage, or any loss or 
        damage whatsoever arising from loss of data or profits arising out of, 
        or in connection with, the use of this website.
      </Typography>

      <Typography paragraph>
        Through this website you are able to link to other websites which are 
        not under the control of Oboe. We have no control over the 
        nature, content and availability of those sites. The inclusion of any 
        links does not necessarily imply a recommendation or endorse the views 
        expressed within them.
      </Typography>

       <Typography paragraph>
         Every effort is made to keep the website up and running smoothly. 
         However, Oboe takes no responsibility for, and will not be 
         liable for, the website being temporarily unavailable due to technical 
         issues beyond our control.
      </Typography>
    </Container>
  )
}
