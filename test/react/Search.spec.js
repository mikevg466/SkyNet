import React from 'react';
import chai, {expect} from 'chai';
import spies from 'chai-spies';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import { Search } from '../../client/containers/Search';

const testUser = {
  email: 'mike@test.com',
}

describe('Search container', () => {
  let SearchComponent;
  beforeEach('Create container', () => {
    SearchComponent = shallow(
      <Search
        user={testUser}
      />
    );
  });

  it('should be a div with a searchbar and a geolocation button', () => {
    expect(SearchComponent.is('div')).to.equal(true);
    expect(SearchComponent.find('form').length).to.equal(1);
    expect(SearchComponent.find('input').length).to.equal(1);
    expect(SearchComponent.find('button').length).to.equal(2);
  });

}); // end describe ('Search container');
