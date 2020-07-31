import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {TermsOfServicesScreenProps} from '../../navigation/menu.navigator';
import {Toolbar} from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {ScrollView} from 'react-native-gesture-handler';

export const TermsOfServicesScreen = (
  props: TermsOfServicesScreenProps,
): SafeAreaLayoutElement => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar
      title="Kon Seavpov Terms of Service"
      onBackPress={props.navigation.goBack}
    />
    <ScrollView style={styles.container}>
      <Text style={{margin: 10}} category="h5">
        1. Object and Validity
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. The company: (hereinafter referred to as “Kon Seavpov”) operates a
        platform for mobile reading and listening on the internet portals
        http://www.konseavpov.com and other websites, as well as on mobile
        applications (a.k.a. Apps)(hereinafter referred to as “Platform”). In
        this context, Kon Seavpov’s authors transform the key insights of
        non-fiction books and other content for you into a concise format. This
        gives you the opportunity to discover new books through delivering the
        key insights from non-fiction books or other content on your computer or
        mobile device. In addition, you have the possibility to purchase content
        on the Platform for download into your Kon Seavpov account library.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. The use of the Platform shall be subject to the following General
        Terms and Conditions (“General Terms and Conditions”) in the version
        valid at the time of your registration respectively order. Kon Seavpov
        does not acknowledge any different general terms and conditions
        belonging to you unless Kon Seavpov agrees to their validity in writing.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. No separate contract text is provided for the agreement pertaining to
        the use of the Platform. The content of the agreement between you and
        Kon Seavpov is based on these General Terms and Conditions, as well as
        on the specific information provided to you as part of the registration
        (see Section 3), when ordering a paid subscription (Section 4) and/or
        audiobooks or other content (see Section 6), that will be saved by Kon
        Seavpov and that is available in your user account at any time.
      </Text>
      <Text style={{margin: 10}} category="p1">
        4. You accept the validity and applicability of these General Terms and
        Conditions when registering, purchasing a paid subscription or
        audiobooks, as the case may be.
      </Text>
      <Text style={{margin: 10}} category="h5">
        2. Kon Seavpov's Serivce and Right
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. Kon Seavpov provides the key insights from non-fiction books, articles
        and other content (for e.g., the "books-in-kon-seavpov" or
        “articles-in-kon-seavpov”, hereinafter jointly referred to as ”Platform
        Content”), which allow you to grasp their essence within a few minutes.
        Moreover, Kon Seavpov may provide a personal profile to you, which you can
        fill with your preferred platform content and text markers as well as
        sorting this content into different categories and lists. In addition,
        you can purchase audiobooks and other premium audio content (“Audiobook
        Content”) on the Platform.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. The extent of the platform Content and the options to use (the
        “License”) depend on the type of account you selected. There is a
        difference between a free account (see Section 3), a paid subscription
        (see Section 4) and a free trial (see Section 5) and a purchase of
        Audiobook Content (see Section 6). In terms of duration, the license is
        limited to the validity period of the free account / paid subscription /
        free trial, however, in case of a purchase of Audiobook Content
        availability in your account will be, subject to Section 6, unlimited.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. The rights to Kon Seavpov's service and the content distributed through
        the service are and will remain with Kon Seavpov and /or Kon Seavpov's
        licensors. The Kon Seavpov software applications and content are licensed
        to you within the scope of the contractual use. We only grant you a
        non-exclusive (simple), time-limited right to personal use of the
        Kon Seavpov service and its contents (however, subject to Section 6,
        availability of purchased Audiobook Content will be unlimited in your
        account).
      </Text>
      <Text style={{margin: 10}} category="p1">
        4. All Kon Seavpov trademarks as well as our trade names, logos, domain
        names and other distinctive features of the Kon Seavpov trademark are the
        sole property of Kon Seavpov. The license does not give you any right to
        use the Kon Seavpov trademarks, our trade names, logos, domain names or any
        other distinctive features of the Kon Seavpov trademark, be it for
        commercial or non-commercial purposes.
      </Text>
      <Text style={{margin: 10}} category="p1">
        5. If you do not use a paid service, Kon Seavpov is allowed to show you
        promotional information on the Platform.
      </Text>
      <Text style={{margin: 10}} category="h5">
        3. Registering with Kon Seavpov
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. In order to be able to use Kon Seavpov’s services, a registration with Kon Seavpov is required. Individuals over the age of 18 have the right to register. As a minor, you may only register with Kon Seavpov if you are at least 14 years old and your legal representatives have provided their consent. Kon Seavpov reserves the right to make the use of Kon Seavpov services contingent on proper proof of your identity, your legal age, or your legal representative’s consent.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. The registration itself is free of charge (free account) and does not oblige you to obtain a paid subscription. By registering, you are executing an agreement with Kon Seavpov for a limited, free use of the Platform.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. You can use your e-mail address as well as a password of your choice to register. Alternatively, you may register using a single sign-on service (for example, Facebook login). You can register via our website or after downloading our iOS, Android or Kindle Fire apps.
      </Text>
      <Text style={{margin: 10}} category="p1">
        4. Any information required for registration must be complete and correct and always up-to-date. Kon Seavpov has the right to save and process the data you provided during registration, in accordance with the provisions on Data Protection.
      </Text>
      <Text style={{margin: 10}} category="p1">
        5. The password used must be kept confidential. Keeping it a secret is solely and fully your responsibility. The Kon Seavpov user account may only be used by you. Any unauthorized use of your user account, as well as any such suspicion to that effect should be communicated to Kon Seavpov immediately.
      </Text>
      <Text style={{margin: 10}} category="h5">
        4. Executing an Agreement for a Paid Subscription
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. To be able to fully benefit from Kon Seavpov's services, additional service packages in the form of paid subscriptions (“Subscription Access”) are available to you after registering. These can be purchased for different, and variable periods of time, which you will see in the order options.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. Kon Seavpov's Subscription Accesses are ad-free, paid subscriptions that allow you to access additional content and features through our mobile and web-based applications. We currently offer the following subscription / service package: The Kon Seavpov Premium service package includes ad-free access to all of our Platform Content in both, text and audio. In addition, it gives you the right to use our premium features Send-to-Kindle and Evernote-Sync. You will have access to the respective services as long as your subscription is valid.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. You submit a legally binding offer for a fee-based subscription, if you enter the information requested in the online order form and then click on the “Order with obligation to pay” button. By doing so, you submit a legally binding offer for an agreement for a paid subscription. Before submitting your order, you may change and view the data at any time.
      </Text>
      <Text style={{margin: 10}} category="p1">
        4. The contract is concluded when Kon Seavpov issues a notice of acceptance (order confirmation), which will be sent to you by email within a reasonable time. If you purchased your fee-based subscription via Kon Seavpov’s web-based application Kon Seavpov will send the order confirmation to you by email together with the receipt confirmation immediately following your order. If you purchased your fee-based subscription via an in-app purchase (please also see subsection 5) you will receive a receipt confirmation following your order from the third party appstore and Kon Seavpov will send to you the notice of acceptance (order confirmation) by separate email. In both cases, the text of the contract (consisting of the order, the General Terms and Conditions and the order confirmation) will be sent to you by Kon Seavpov on a permanent data carrier (email) (contract confirmation). Your subscription begins on this date. The text of the agreement is saved subject to data protection. Please read our Privacy Statement for information on the collection, use and processing of your data.
      </Text>
      <Text style={{margin: 10}} category="p1">
        5. You can also sign up for a paid subscription through an in-app purchase through our iOS or Android apps or our Amazon Alexa Skill. In order to do this, you must select the desired option on the subscription screen within the app, and a pop-up will appear where you have to enter your password for the third party appstore. As soon as you finish, a pop-up will appear in which you have to confirm the purchase of the subscription again. At this point you can still cancel the process. You should then receive a receipt confirmation from the third party appstore (not directly from Kon Seavpov).
      </Text>
      <Text style={{margin: 10}} category="h5">
        5. Trials/ Testing Phases
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. Kon Seavpov occasionally offers in particular to new users free Subscription Access for testing purposes for a certain period of time (“Trial”). Kon Seavpov determines, at its sole discretion, if you may participate in a Trial. In case of an important reason, Kon Seavpov may discontinue or change such free Trial at any time without prior notice or notification.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. You can only participate in certain Trials if you enter your payment details when you sign up for the Trial. In such a case, we need your consent at the beginning of the Trial that your free access will be converted into a paid Subscription Access (Section 4) on the day following the end of the Trial. In this situation, your subscription renews itself on a recurring basis and can be terminated up to one day before the end of the respective subscription period (Section 8.2).
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. If, in a case of Section 5.2 , you do not wish to have the Subscription Access and the charge associated with it, you must cancel your Subscription Access given to you during the Trial before the end of the Trial (for example, by simply going to your Kon Seavpov Account Settings or the respective app store settings).
      </Text>
      <Text style={{margin: 10}} category="h5">
        6. Audiobooks and Credits
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. If you registered with Kon Seavpov, Kon Seavpov allows you to purchase Audiobook Content through the Platform. Purchases can be made on an à la carte basis. Paid Subscription Access is not necessary in order to purchase Audiobook Content, however Kon Seavpov will often offer more attractive pricing for Audiobook Content for customers who have Subscription Access.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. If you have Subscription Access you may also purchase credits to be used for the purchase of Audiobook Content. Kon Seavpov may also offer customers with Subscription Access credits as a promotion, reward or incentive. Credits may only be redeemed by you if you have Subscription Access. Credits expire 18 months from the date when they were issued. For instance, if you received a credit on August 1, 2020, it will expire with expiration of January 31, 2022. Each time you use a credit to pay for Audiobook Content, that credit will be deducted from the total number of credits you have in your account. When purchasing Audiobook Content, Kon Seavpov will apply your oldest credit first, so that you will always be using the credits that expire the soonest.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. You submit a legally binding offer for the Audiobook Content and/or credit/s that you have selected, if you enter the information requested in the online order form and then click on the button “Order with obligation to pay”. By doing so, you submit a legally binding offer for a paid contract. Before submitting your order, you may change and view the data at any time.
      </Text>
      <Text style={{margin: 10}} category="p1">
        4. The contract is concluded when Kon Seavpov issues a notice of acceptance (order confirmation), which will be sent to you by email within a reasonable time. If you purchased your Audiobook Content and/or credit/s via Kon Seavpov’s web-based application Kon Seavpov will send the order confirmation to you by email together with the receipt confirmation immediately following your order. If you purchased your Audiobook Content and/or credit/s via an in-app purchase (please also see subsection 5) you will receive a receipt confirmation following your order from the third party appstore and Kon Seavpov will send to you the notice of acceptance (order confirmation) by separate email. In both cases, the text of the contract (consisting of the order, the General Terms and Conditions and the order confirmation) will be sent to you by Kon Seavpov on a permanent data carrier (email) (contract confirmation). The text of the agreement is saved subject to data protection. Please read our Privacy Statement for information on the collection, use and processing of your data.
      </Text>
      <Text style={{margin: 10}} category="p1">
        5. You can also buy Audiobook Content and/or credit/s through an in-app purchase through our iOS or Android apps or our Amazon Alexa Skill. In order to do this, you must select the desired option on the purchase screen within the app where you have to log-in and confirm the purchase of the Audiobook Content and/or credit/s. At this point you can still cancel the process. You should then receive a receipt confirmation from the third party appstore (not directly from Kon Seavpov).
      </Text>
      <Text style={{margin: 10}} category="p1">
        6. Kon Seavpov reserves the right, in its sole discretion, to change prices of audiobooks and credits, at any time.
      </Text>
      <Text style={{margin: 10}} category="p1">
        7. In the event Kon Seavpov provided you with free Audiobook Content in connection with a Subscription Access, and you decide to cancel your Subscription Access, Kon Seavpov may remove such free Audiobook Content granted in connection with Subscription Access from your Kon Seavpov Library.
      </Text>
      <Text style={{margin: 10}} category="p1">
        8. Kon Seavpov in its absolute and sole discretion, reserves the right to refuse orders for Audiobook Content placed through the Platform, and – taking into account the particular circumstances of the case – in the event of fraud or abuse by a user, the right to temporarily block the access or to remove the Audiobook Content available in the library of that user.
      </Text>
      <Text style={{margin: 10}} category="p1">
        9. When you purchase Audiobook Content, Kon Seavpov grants you a non-exclusive, non-transferable, non-assignable, non-sublicensable license to download such content to your Kon Seavpov Library for your personal, non-commercial use. You are not entitled to alter, modify, sell, transfer, share, lease, decompile, disassemble, reverse engineer, copy, reproduce, duplicate, distribute, publicly perform, create derivative works from or otherwise commercially exploit the Audiobook Content or otherwise use and/or export the Audiobook Content outside the Kon Seavpov Library. Any unauthorized transfer, duplication, or exploitation of any Audiobook Content constitutes copyright infringement, breach of contract, and potential other violations and liabilities, and is subject to civil and criminal penalties.
      </Text>
      <Text style={{margin: 10}} category="p1">
        10. Purchased Audiobook Content will generally continue to be available in your "Library" but may become unavailable through no fault of Kon Seavpov due to the unlikely event of potential new licensing restrictions of the content providers or other new requirements of the content providers. Kon Seavpov will not be liable to you if Audiobook Content becomes unavailable for further download for such reasons.
      </Text>
      <Text style={{margin: 10}} category="h5">
        7. Change of Terms and Conditions
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. Kon Seavpov reserves the right to amend and/or supplement the General Terms and Conditions with effect in the future, provided that this is reasonable for you taking into account Kon Seavpov’s interests. If no explicit consent is obtained from you to adapt the General Terms and Conditions, you will be notified by Kon Seavpov of any amendments and/or supplements to the terms and conditions in a timely manner (at least four weeks before the amended General Terms and Conditions enter into force). To this end, Kon Seavpov will send you the new version of the General Terms and Conditions to the e-mail address specified by you in the registration. In this context, Kon Seavpov will expressly point out to you the possibility and deadline for an objection to the new version of the General Terms and Conditions, as well as the consequences, should you not object.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. If you do not object to the applicability of the new version of the General Terms and Conditions within four weeks after receipt of the notification referred to in paragraph (1) of this Section, the new version of the GTC shall be deemed accepted by you.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. If you object to the new version of the General Terms and Conditions in due time, the contractual relationship shall be continued under the previous General Terms and Conditions, but Kon Seavpov may decide to terminate the free user agreement or the paid subscription with effect from the next possible regular termination date.
      </Text>
      <Text style={{margin: 10}} category="h5">
        8. Out-of-Court Dispute Resolution
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. For the out-of-court resolution of consumer disputes, the European Union has set up an Online Dispute Resolution (“OS Platform”) platform that can be accessed at http://ec.europa.eu/consumers/odr. The platform serves as a point of contact for the out-of-court resolution of disputes concerning contractual obligations arising from online agreements. According to § 36 VSBG [Verbraucherstreitbeilegungsgesetz, Consumer Dispute Resolution Act], Kon Seavpov points out that Kon Seavpov is neither obligated nor willing to participate in a dispute resolution procedure before a consumer arbitration board.
      </Text>
      <Text style={{margin: 10}} category="h5">
        9. Final Provisions
      </Text>
      <Text style={{margin: 10}} category="p1">
        1. If any provision of these General Terms and Conditions is invalid, the remainder of the agreement remains valid. The statutory provisions shall take effect over the invalid regulations.
      </Text>
      <Text style={{margin: 10}} category="p1">
        2. The law of the Federal Republic of Germany shall apply, excluding the provisions of the UN Convention on Contracts for the International Sale of Goods (CISG). The legal provisions restricting the choice of law and the applicability of mandatory regulations, in particular of the state in which the customer normally resides as a consumer, remain hereof unaffected.
      </Text>
      <Text style={{margin: 10}} category="p1">
        3. If no exclusive legal court of jurisdiction is given, all disputes arising out of or in connection with the contractual relationship shall be settled exclusively by the court at Kon Seavpov’s registered office, thus Berlin, provided that you are a merchant, a legal entity under public law or a special fund under public law or have no general court of jurisdiction in Germany or another EU member state, or have moved your (residential) address to non-EU countries subject to the validity of these General Terms and Conditions.
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
