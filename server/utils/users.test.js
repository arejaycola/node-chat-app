const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {


	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		},{
			id: '2',
			name: 'Jen',
			room: 'React Course'
		},{
			id: '3',
			name: 'Julie',
			room: 'Node Course'
		}]
	});

	it('Should add new user', () => {
		var users = new Users();
		var user = {
			id:'123', 
			name: 'Rob',
			room: 'The office fans'
		}

		var responseUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Should return names for node course', () => {
		var userList = users.getUserList("Node Course");

		expect(userList).toEqual(['Mike', 'Julie']);
	});

	it('Should return names for react course', () => {
		var userList = users.getUserList("React Course");

		expect(userList).toEqual(['Jen']);
	});

	it('Should remove a user', () => {
		var userId = '1';
		var user = users.removeUser(userId);
		var userList = users.getUserList("Node Course");

		expect(userList).toEqual(['Julie']);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('Should not remove user', () => {
		var userId = '1111';
		var user = users.removeUser(userId);
		// var userList = users.getUserList('Node Course');

		expect(typeof user).toBe('undefined');
		expect(users.users.length).toBe(3);


	});

	it('Should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('Should not find user', () => {
		var userId = '23234';
		var user = users.getUser(userId);

		expect(typeof user).toBe('undefined');
	})
});