describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Dolly', email: 'dolly@dollywood.com'});
  }));

  it('should get the users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
     .getUser()
     .then(function(res){
       var data = res.data;
       if(data.email === 'dolly@dollywood.com' && data.first_name == 'Dolly'){
         done();
       }
     });
      $httpBackend.flush();
  });

  it('should join first and last name', function(){
    expect(UserService.createFullName({first_name: 'First', last_name: 'Last'})).toEqual('First Last');
  })
});
