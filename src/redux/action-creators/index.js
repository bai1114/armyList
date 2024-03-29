import axios from 'axios';

// Redirect
export const redirect = () => {
  return {
    type: 'REDIRECT'
  };
};

export const resetRedirect = () => {
  return {
    type: 'RESET_REDIRECT'
  };
};


// Fetch Page
const fetchSoldiersStart = () => {
  return {
    type: 'FETCH_SOLDIERS_START'
  };
};

const fetchSoldiersSuccess = (soldiers) => {
  return {
    type: 'FETCH_SOLDIERS_SUCCESS',
    soldiers
  };
};

const fetchSoldiersFail = err => {
  return {
    type: 'FETCH_SOLDIERS_FAIL',
    err
  };
};

export const fetchSoldiers = () => {
  return (dispatch) => {
    dispatch(fetchSoldiersStart());
    axios
      .get('http://localhost:5000/api/range/0/10')
      .then(response => {
        dispatch(fetchSoldiersSuccess(response.data.soldiers));
      })
      .catch(err => {
        dispatch(fetchSoldiersFail(err));
      });
  }
}

// add range
const addRangeSoldiersStart = () => {
  return {
    type: 'ADD_RANGE_SOLDIERS_START'
  };
};

const addRangeSoldiersSuccess = (soldiers, hasMore) => {
  return {
    type: 'ADD_RANGE_SOLDIERS_SUCCESS',
    soldiers,
    hasMore
  };
};

const addRangeSoldiersFail = err => {
  return {
    type: 'ADD_RANGE_SOLDIERS_FAIL',
    err
  };
};

export const addRangeSoldiers = (offset, limit) => {
  return dispatch => {
    dispatch(addRangeSoldiersStart());
    axios({
      method: 'get',
      url: `http://localhost:5000/api/range/${offset}/${limit}`
    })
      .then(response => {
        const soldiers = response.data.soldiers;
        const hasMore = soldiers.length >= limit;
        dispatch(addRangeSoldiersSuccess(soldiers, hasMore));
      })
      .catch(err => {
        dispatch(addRangeSoldiersFail(err));
      });
  };
};

// load
export const reload = () => {
  return (dispatch) => {
    dispatch(fetchSoldiersStart());
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/'
    })
      .then(response => {
        dispatch(fetchSoldiersSuccess(response.data.soldiers));
      })
      // .then(res => {
      //   dispatch(sortSoldiers("", true));
      // })
      .catch(err => {
        dispatch(fetchSoldiersFail(err));
      });
  }
};



// Fetch Sub Page
const fetchDirectSubsStart = () => {
  return {
    type: 'FETCH_DIRECT_SUBS_START'
  };
};

const fetchDirectSubsSuccess = directSubs => {
  return {
    type: 'FETCH_DIRECT_SUBS_SUCCESS',
    directSubs
  };
};

const fetchDirectSubsFail = err => {
  return {
    type: 'FETCH_DIRECT_SUBS_FAIL',
    err
  };
};

export const fetchDirectSubs = _id => {
  return (dispatch) => {
    dispatch(fetchDirectSubsStart());
    axios({
      method: 'get',
      url: `http://localhost:5000/api/${_id}/directSubs`
    })
      .then(response => {
        dispatch(fetchDirectSubsSuccess(response.data.directSubs));
      })
      .catch(err => {
        dispatch(fetchDirectSubsFail(err));
      });
  };
};


// Fetch Sup Page
const fetchSupStart = () => {
  return {
    type: 'FETCH_SUP_START'
  };
};

const fetchSupSuccess = soldier => {
  return {
    type: 'FETCH_SUP_SUCCESS',
    soldier
  };
};

const fetchSupFail = err => {
  return {
    type: 'FETCH_SUP_FAIL',
    err
  };
};

export const fetchSup = _id => {
  return (dispatch) => {
    dispatch(fetchSupStart());
    axios({
      method: 'get',
      url: `http://localhost:5000/api/${_id}`
    })
      .then(response => {
        dispatch(fetchSupSuccess(response.data.soldier));
      })
      .catch(err => {
        dispatch(fetchSupFail(err));
      });
  };
};


// Create User
const createSoldierStart = () => {
  return {
    type: 'CREATE_SOLDIER_START'
  };  
};
const createSoldierFail = (error) => {
  return {
    type:'CREATE_SOLDIER_FAIL',
    error
  };
};

const createSoldierSuccess = (newSoldier) => {
  return {
    type:'CREATE_SOLDIER_SUCCESS',
    newSoldier
  }
};

 
export const createSoldier = (soldier) => {
  return (dispatch) => {
    dispatch(createSoldierStart());
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/create',
      data: soldier
    })
      .then(response => {
        // console.log('response.data.soldier', response.data.soldier);
        dispatch(createSoldierSuccess(response.data.soldier));
        dispatch(redirect());  
      })
      .catch(error => {
        dispatch(createSoldierFail(error));
      });
  };
};

// Edit User
const editSoldierStart = () => {
  return {
    type: 'EDIT_SOLDIER_START'
  };
};

const editSoldierFail = (error) => {
  return {
    type: 'EDIT_SOLDIER_ERROR',
    error
  };
};

const editSoldierSuccess = (id, soldier) => {
  return {
    type: 'EDIT_SOLDIER_SUCCESS',
    id,
    soldier
  };
};

export const editSoldier = (id, soldier) => {
  return (dispatch) => {
    dispatch(editSoldierStart());
    // console.log('id', id);
    axios({
      method: 'put',
      url: `http://localhost:5000/api/edit/${id}`,
      data: soldier
    })
      .then(response => {
        dispatch(editSoldierSuccess(id, response.data.soldier));
        dispatch(redirect());  
      })
      .then(response => {
        dispatch(reload());  
      })
      .catch(error => {
        dispatch(editSoldierFail(error));
      });
   };
};

// Delete User
const deleteSoldierStart = () => {
  return {
    type: 'DELETE_SOLDIER_START'
  };
};

const deleteSoldierFail = (error) => {
  return {
    type: 'DELETE_SOLDIER_ERROR',
    error
  };
};

const deleteSoldierSuccess = (id) => {
  return {
    type: 'DELETE_SOLDIER_SUCCESS',
    id
  };
};

export const deleteSoldier = (id) => {
  return (dispatch) => {
    dispatch(deleteSoldierStart());
    // console.log('delete id is ', id);
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then(response => {
        dispatch(deleteSoldierSuccess(id));
        dispatch(redirect());  
      }) 
      .catch(error => {
        dispatch(deleteSoldierFail(error));
      });
  };
};


// Upload Image
const uploadImageStart = () => {
  return {
    type: 'UPLOAD_IMAGE_START'
  };
};

const uploadImageSuccess = (image, filename, imgUrl) => {
  return {
    type: 'UPLOAD_IMAGE_SUCCESS',
    image,
    filename,
    imgUrl
  };
};

const uploadImageFail= err => {
  return {
    type: 'UPLOAD_IMAGE_FAIL',
    err
  };
};

export const uploadImage = (image, filename) => {
  let data = new FormData();
  data.append('image', image);
  data.append('filename', filename);

  return (dispatch) => {
    dispatch(uploadImageStart());
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/image',
      data: data
    })
      .then(response => {
        dispatch(uploadImageSuccess(image, filename, response.data.imgUrl));
      })
      .catch(err => {
        dispatch(uploadImageFail(err));
      });
  }
};




export const sortSoldiers = (key,keep) => {
  return {
    type: 'SORT_SOLDIERS',
    key,
    keep,
  };
};

export const changeInput = input => {
  return {
    type: 'CHANGE_INPUT',
    input
  };
};

export const clearInput = () => {
  return {
    type: 'CLEAR_INPUT',
  };
};


      // .then(response => {
      //   dispatch(reload());  
      // })






