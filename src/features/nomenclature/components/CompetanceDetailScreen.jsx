import HeaderInScreen from '../../header/HeaderInScreen'
import React, { Fragment, useState, useEffect } from 'react';
import { authenticateClient, getDetailleCompetance } from './api';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { LoadingMetier } from '../../../shared'

function CompetanceDetail() {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {

        authenticateClient()
            .then((data) => {
            getDetailleCompetance(data.access_token, code)
                .then((data) => {
                console.log(data)
                setLoading(false);
                })
                .catch((error) => {
                setError(true);
                setLoading(false);
                });
            })
        .catch((error) => {
          console.error('Authentication error:', error.message);
        });
    }, [code]);
    if (loading || error) {
        return (
          <Fragment>
              <HeaderInScreen
                  title={'Liste fiche métier'}
              />
              {LoadingMetier(loading, error)}
          </Fragment>
        );
    }
    return (
      <Fragment>
        <HeaderInScreen
            title={'Liste fiche métier'}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            
        </Box>
    </Fragment>
    );
}

export default CompetanceDetail