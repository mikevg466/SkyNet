import React from 'react';
import chai, {expect} from 'chai';
import spies from 'chai-spies';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import { UserHome } from '../../client/components/UserHome';

const testUser = {
  email: 'mike@test.com',
}

describe('UserHome component', () => {
  let characterComponent;
  beforeEach('Create component', () => {
    UserHomeComponent = shallow(
      <UserHome
        user={testUser}
      />
    );
  });

  it('should be a div with a searchbar and a geolocation button', () => {
    expect(characterComponent.is('div')).to.equal(true);
    expect(characterComponent.find('form').length).to.equal(1);
    expect(characterComponent.find('input').length).to.equal(1);
    expect(characterComponent.find('button').length).to.equal(2);
  });

}); // end describe ('UserHome component');
