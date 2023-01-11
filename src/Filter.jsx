import React from 'react'


function Filter() {
  return (
    <>
        <div class="filter-flex">
            <div class="input-group mb-3 filter-bar">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Filter transactions" aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Filter</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Filter