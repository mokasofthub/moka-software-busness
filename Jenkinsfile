// Jenkins must have 'jenkins-nextjs-lib' configured as a Global Trusted Pipeline Library
// pointing to your shared library repo (branch: main)
// Requires Jenkins GitHub Plugin for webhook triggers
@Library('jenkins-nextjs-lib') _

buildNextApp(
    deployBranch:  'main',
    awsRegion:     'us-east-1',
    ecrRepository: 'moka-software-business',
    ecsCluster:    'moka-cluster',
    ecsService:    'moka-service',
    containerName:           'moka-software-business',
    cloudfrontDistributionId: 'E2MZ1JOJMAKL7T',
    route53HostedZoneId:      'Z060171628JQ5P7XSLA4C',
    originRecordName:         'origin.mokasoftwarebusness.com'
)
