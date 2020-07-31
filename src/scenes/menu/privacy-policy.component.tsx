import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {PrivacyPolicyScreenProps} from '../../navigation/menu.navigator';
import {Toolbar} from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {ScrollView} from 'react-native-gesture-handler';

export const PrivacyPolicyScreen = (
  props: PrivacyPolicyScreenProps,
): SafeAreaLayoutElement => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title="Kon Seavpov Privacy Policy" onBackPress={props.navigation.goBack} />
    <ScrollView style={styles.container}>
      <Text style={{margin: 10}} category="h5">
        Our Privacy Policy in a nutshell
      </Text>
      <Text style={{margin: 10}} category="p1">
        The following notes give you an overview of how we collect and process
        your information.
      </Text>
      <Text style={{margin: 10}} category="h5">
        Your Right as a user to our services
      </Text>
      <Text style={{margin: 10}} category="p1">
        You have the right to information, correction, blocking or deletion of
        your data at any time. Any given consent can be revoked at any time and
        you may partially object to the processing of your data, even if no
        consent was required from you for the processing. You can contact our
        data protection officer at any time for further information on privacy
        issues.
      </Text>
      <Text style={{margin: 10}} category="h5">
        Data we collect about you
      </Text>
      <Text style={{margin: 10}} category="p1">
        On the one hand, your data is captured because you communicate it to us.
        This may, for example, be data that you enter in our contact form. Other
        data is collected automatically when visiting the website through our IT
        systems. These are above all technical data (e.g. Internet browser,
        operating system or time of the page request). The collection of this
        data is automatic as soon as you visit our platform.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Registration Information: When you register for Kon Seavpov (for our free
        offer, paid subscription, or use of a code), we collect the personal
        information that you voluntarily provide to us when registering through
        your access device.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Mobile Advertising ID: If not disabled by the user, we collect the
        Mobile Advertising ID provided by your mobile device. If you do not want
        us to collect this Mobile Advertising ID, you can always disable or
        change this on your device. Please see this manual for iOS devices and
        this manual for Android devices.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Cookies and Cookie-Policy: For the provision of the Kon Seavpov service and
        to make our offer more user-friendly, effective and secure, we also use
        so-called cookies for data collection and storage. Cookies are small
        data packets that are stored on your device and do no harm. We collect
        Cookies in the following categories:
      </Text>
      <Text style={{margin: 10}} category="p2">
        Necessary technical or functional cookies: They help make a website
        usable by enabling basic functions like page navigation and access to
        secure areas of the website. The website cannot function properly
        without these cookies.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Preference cookies: They enable a website to remember information that
        changes the way the website behaves or looks, like your preferred
        language or the region that you are in.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Statistical cookies: They help website owners to understand how visitors
        interact with websites by collecting and reporting information
        anonymously.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Marketing cookies: They are used to track visitors across websites. The
        intention is to display ads that are relevant and engaging for the
        individual user.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Cookie settings: You can change your cookie settings anytime using this
        Link.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Tracking Services: We use tracking services to collect information about
        the behavior of visitors to our pages. So we can ensure an optimal user
        experience. These services use pseudonymised user profiles with the help
        of cookies, so that a direct inference to persons is not possible. Of
        course you can contradict the creation of these profiles at any time.
        Incidentally, each access device can be configured in such a way that
        basically no cookies can be created at all, or they can be deleted
        directly after the session.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Social Plugins: Our pages contain buttons from various social networks
        so that you can recommend our offers, services and / or products to
        other interested people. If you click on such a button, data such as
        your current IP address, browser and access device information (type and
        operating system), the resolution of the screen, if you have plug-ins
        installed will be the referrer (from where you came to the site) and the
        current URL to the site operator.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Newsletter: When you sign up for our newsletter, your email address will
        be used for information on advertising and advertising purposes. Of
        course, this is voluntary and you can even after the consent at any time
        unsubscribe.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Payment Information: If you use our free access, any of our trial phases
        or any of our subscriptions or you purchase anything through the
        Service, credit card information and other financial information we need
        to process the payment will be collected and stored with a payment
        service provider. We ourselves receive very little information from the
        payment providers about you.
      </Text>
      <Text style={{margin: 10}} category="p2">
        Personal Data of Children: We are not aware of collecting personal data
        from children under 16 years of age; if you are under 16 years of age,
        please do not register for Kon Seavpov or send us any personal data. If we
        learn we have collected personal data from a child under 16 years of
        age, we will delete that information as quickly as possible. If you
        believe that a child under 16 may have provided us personal data, please
        contact us at privacy@konseavpov.com.
      </Text>
      <Text style={{margin: 10}} category="h6">
        How we collect your data
      </Text>
      <Text style={{margin: 10}} category="p2">
        We collect your data in three different ways:
      </Text>
      <Text style={{margin: 10}} category="p2">
        1. automated when you visit our website
      </Text>
      <Text style={{margin: 10}} category="p2">
        2. through cookies
      </Text>
      <Text style={{margin: 10}} category="p2">
        3. through your voluntary input
      </Text>
    </ScrollView>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 5,
  },
});
