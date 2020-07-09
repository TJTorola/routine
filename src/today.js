import React from 'react';
import { Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';

export default ({ navigation }) => (
  <>
    <TopNavigation title='Today' alignment='center' />
    <Divider/>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>TODAY</Text>
    </Layout>
  </>
);
