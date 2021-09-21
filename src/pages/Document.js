import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'shards-react';
import PageSpinner from '../components/common/PageSpinner';

export default function DocViewer() {
  const contentUrl = useSelector(state => state.docContentUrl);

  useEffect(() => {
    if(contentUrl.data) {
     const url = new URL(contentUrl.data);
    //  const u = url.openConnection();
    //  const type = u.getHeaderField("Content-Type");
    } 
  }, [contentUrl]);

  if (!contentUrl.isSuccessful || !contentUrl.data) {
     return <PageSpinner />
  }

  return (
    <Container>
      
    </Container>
  )
}