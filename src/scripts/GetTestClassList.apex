/**
 * CC BY-SA 4.0
 * https://salesforce.stackexchange.com/questions/122870/how-to-get-a-list-of-test-classes-in-an-org
 * asked: Chathura https://salesforce.stackexchange.com/users/28984/chathura
 * answered: Valentos https://salesforce.stackexchange.com/users/44629/valentos
 */
Http http = new Http();
HttpRequest request = new HttpRequest();
request.setEndpoint(URL.getOrgDomainUrl().toExternalForm() + '/_ui/common/apex/test/ApexTestQueueServlet');
request.setMethod('POST');
request.setHeader('content-type', 'application/x-www-form-urlencoded');
request.setHeader('cookie', 'sid=' + UserInfo.getSessionId());
request.setBody('action=GET_TESTS');
HttpResponse response = http.send(request);
// Parse the JSON response
if (response.getStatusCode() == 200) {
    String body = response.getBody().replace('while(1);', '');
    // Deserialize the JSON string into collections of primitive data types.
    Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(body);
    // Cast the values in the 'testClasses' key as a list
    List<Object> testClasses = (List<Object>) results.get('testClasses');
    for (Object testClass : testClasses) {
        Map<String, Object> testClassRecord = (Map<String, Object>) testClass;
        System.debug((String) testClassRecord.get('name'));
    }
}
