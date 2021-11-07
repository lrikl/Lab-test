paginator(document.getElementById("pag"),1);

function paginator(paginContID, countElem) {
  if (paginContID) {
    if (paginContID.children.length > countElem) {
      for (let i = countElem; i < paginContID.children.length; i++) {
        paginContID.children[i].style.display = 'none';
      }
      paginContID.style.overflow = 'hidden';
      let divForPaging = document.createElement('div');
      divForPaging.className = 'divPaging';

      let bNext = document.createElement('button');
      bNext.className = 'bNextPaging';
      bNext.id = 'bNextPaging';
      let myDiv = document.createElement('img');
            myDiv.src = 'img/str-b.png';
            myDiv.style.height='11px';
            myDiv.style.width='6px';
            myDiv.style.margin ='0 0 0 10px';
            bNext.appendChild(myDiv);

      let divContainerNumbers = document.createElement('div');
      divContainerNumbers.className = 'divContainerNumbers';

      let bPrevious = document.createElement('button');
      bPrevious.className = 'bPreviousPaging';
      bPrevious.id = 'bPreviousPaging';
      let myDiv2 = document.createElement('img');
      myDiv2.src = 'img/str-b.png';
      myDiv2.style.height='11px';
      myDiv2.style.width='6px';
      myDiv2.style.transform ='rotate(180deg)';
      myDiv2.style.margin ='0 10px 0 0';
     
      bPrevious.appendChild(myDiv2);
      $(bPrevious).attr('disabled', 'disabled');

      divForPaging.appendChild(bPrevious);
      let countButtons = 3;
      if (Math.ceil((paginContID.children.length) / countElem) > 7) {
        for (let i = 0; i < 5; i++) {
          let bNumber = document.createElement('button');
          bNumber.className = 'bNumberPaging';
          bNumber.name = 'bNumberPaging';
          if (i == 0) {
            $(bNumber).attr('disabled', 'disabled');
            $(bNumber).addClass('bNumberPagingSelected');
          }
          bNumber.innerText = i + 1;
          bNumber.value = i;
          divContainerNumbers.appendChild(bNumber);
        }
        let bNumber = document.createElement('button');
        bNumber.className = 'bNumberPaging';
        bNumber.name = 'bNumberPaging';
        bNumber.innerText = '...';
        bNumber.value = 'points';
        divContainerNumbers.appendChild(bNumber);
        let bNumberMax = document.createElement('button');
        bNumberMax.className = 'bNumberPaging';
        bNumberMax.name = 'bNumberPaging';
        bNumberMax.innerText = Math.ceil((paginContID.children.length / countElem));
        bNumberMax.value = Math.ceil((paginContID.children.length / countElem) - 1);
        divContainerNumbers.appendChild(bNumberMax);
      } else {
        for (let i = 0; i < Math.ceil((paginContID.children.length) / countElem); i++) {
          let bNumber = document.createElement('button');
          bNumber.className = 'bNumberPaging';
          bNumber.name = 'bNumberPaging';
          bNumber.innerText = i + 1;
          bNumber.value = i;
          if (i == 0) {
            $(bNumber).attr('disabled', 'disabled');
            $(bNumber).addClass('bNumberPagingSelected');
          }
          divContainerNumbers.appendChild(bNumber);
        }
      }

      divForPaging.appendChild(divContainerNumbers);
      divForPaging.appendChild(bNext);
      paginContID.appendChild(divForPaging);

      let PageNow = 0;
      let trigOnce = 0;

      $(bNext).click(function() {
        bNextF();
      });

      function bNextF() {
        let countHide = 0;
        let countShowed = 0;
        let buttonID = $(paginContID).children().last().find("div").children();
        if (Math.ceil((paginContID.children.length - 1) / countElem) > 7) {
          if (+PageNow >= 0 && +PageNow < 3) {
            $(buttonID[PageNow]).removeAttr('disabled');
            $(buttonID).removeClass('bNumberPagingSelected');
            $(buttonID[+PageNow + 1]).attr('disabled', 'disabled');
            $(buttonID[+PageNow + 1]).addClass('bNumberPagingSelected');
            trigOnce++;
          } else {
            if ((+PageNow < Math.ceil((+paginContID.children.length - 1) / +countElem) - 5)) {
              $(buttonID[1]).text('...');
              $(buttonID[1]).val('points');
              $(buttonID[2]).text(+PageNow + 1);
              $(buttonID[2]).val(+PageNow);
              $(buttonID[3]).text(+PageNow + 2); //;
              $(buttonID[3]).val(+PageNow + 1);
              $(buttonID[4]).text(+PageNow + 3);
              $(buttonID[4]).val(+PageNow + 2);
              $(buttonID[5]).text('...');
              $(buttonID[5]).val('points');
            } else {
              if ((+PageNow == Math.ceil((+paginContID.children.length - 1) / +countElem) - 5)) {
                $(buttonID[1]).text('...');
                $(buttonID[1]).val('points');
                $(buttonID[2]).text(+PageNow + 1);
                $(buttonID[2]).val(+PageNow);
                $(buttonID[3]).text(+PageNow + 2); //;
                $(buttonID[3]).val(+PageNow + 1);
                $(buttonID[4]).text(+PageNow + 3);
                $(buttonID[4]).val(+PageNow + 2);
                $(buttonID[5]).text(Math.ceil(((paginContID.children.length - 1) / countElem) - 1));
                $(buttonID[5]).val(Math.ceil(((paginContID.children.length - 1) / countElem) - 2));
              } else {
                $(buttonID[trigOnce]).removeAttr('disabled');
                $(buttonID).removeClass('bNumberPagingSelected');
                $(buttonID[+trigOnce + 1]).attr('disabled', 'disabled');
                $(buttonID[+trigOnce + 1]).addClass('bNumberPagingSelected');
                trigOnce++;
              }
            }
          }
        } else {
          $(buttonID[PageNow]).removeAttr('disabled');
          $(buttonID).removeClass('bNumberPagingSelected');
          $(buttonID[+PageNow + 1]).attr('disabled', 'disabled');
          $(buttonID[+PageNow + 1]).addClass('bNumberPagingSelected');
        }
        PageNow++;
        for (let i = 0; i < paginContID.children.length - 1; i++) {
          if ($(paginContID.children[i]).is(':visible')) {
            if (i == 0) {
              $(bPrevious).removeAttr('disabled');
            }
            $(paginContID.children[i]).css({
              'animation-name': 'fadeOutLeft'
            });
            setTimeout(function() {
              $(paginContID.children[i]).css({
                'display': 'none'
              });
            }, 600);
            countHide++;
          } else if (countHide == countElem) {
            countShowed++
            setTimeout(function() {
              $(paginContID.children[i]).css({
                'display': 'flex'
              });
              $(paginContID.children[i]).css({
                'animation-name': 'fadeInRight'
              });
            }, 600)
            if (countShowed > countElem - 1) {
              if (i == paginContID.children.length - 2) {
                $(bNext).attr('disabled', 'disabled');
              }
              break;
            } else if (i == paginContID.children.length - 2) {
              $(bNext).attr('disabled', 'disabled');
              break;
            }
          }
        }
      }

      $(bPrevious).click(function() {
        bPreviousF();
      });

      function bPreviousF() {
        let countHide = 0;
        let countShowed = 0;
        let trigLast = 0;
        let buttonID = $(paginContID).children().last().find("div").children();
        if (Math.ceil((paginContID.children.length - 1) / countElem) > 7) {
          if (+PageNow >= 0 && +PageNow < 4) {
            $(buttonID[PageNow]).removeAttr('disabled');
            $(buttonID).removeClass('bNumberPagingSelected');
            $(buttonID[PageNow - 1]).attr('disabled', 'disabled');
            $(buttonID[PageNow - 1]).addClass('bNumberPagingSelected');
            trigOnce--;
          } else {
            if ((+PageNow < Math.ceil((+paginContID.children.length - 1) / +countElem) - 4) && +PageNow > 4) {
              $(buttonID[1]).text('...');
              $(buttonID[1]).val('points');
              $(buttonID[2]).text(+PageNow - 1);
              $(buttonID[2]).val(+PageNow - 2);
              $(buttonID[3]).text(+PageNow); //;
              $(buttonID[3]).val(+PageNow - 1);
              $(buttonID[4]).text(+PageNow + 1);
              $(buttonID[4]).val(+PageNow);
              $(buttonID[5]).text('...');
              $(buttonID[5]).val('points');
            } else if ((+PageNow >= Math.ceil((+paginContID.children.length - 1) / +countElem) - 4)) {
              if ((+PageNow == Math.ceil((+paginContID.children.length - 1) / +countElem) - 4)) {
                $(buttonID[1]).text('...');
                $(buttonID[1]).val('points');
                $(buttonID[2]).text(+PageNow - 1);
                $(buttonID[2]).val(+PageNow - 2);
                $(buttonID[3]).text(+PageNow); //;
                $(buttonID[3]).val(+PageNow - 1);
                $(buttonID[4]).text(+PageNow + 1);
                $(buttonID[4]).val(+PageNow);
                $(buttonID[5]).text('...');
                $(buttonID[5]).val('points');
              } else {;
                $(buttonID[trigOnce]).removeAttr('disabled');
                $(buttonID).removeClass('bNumberPagingSelected');
                $(buttonID[trigOnce - 1]).attr('disabled', 'disabled');
                $(buttonID[trigOnce - 1]).addClass('bNumberPagingSelected');
                trigOnce--;
              }
            } else if (+PageNow == 4) {
              $(buttonID[1]).text('2');
              $(buttonID[1]).val('1');
              $(buttonID[2]).text(+PageNow - 1);
              $(buttonID[2]).val(+PageNow - 2);
              $(buttonID[3]).text(+PageNow); //;
              $(buttonID[3]).val(+PageNow - 1);
              $(buttonID[4]).text(+PageNow + 1);
              $(buttonID[4]).val(+PageNow);
              $(buttonID[5]).text('...');
              $(buttonID[5]).val('points');
            }
          }
        } else {
          $(buttonID[PageNow]).removeAttr('disabled');
          $(buttonID).removeClass('bNumberPagingSelected');
          $(buttonID[PageNow - 1]).attr('disabled', 'disabled');
          $(buttonID[PageNow - 1]).addClass('bNumberPagingSelected');
        }
        PageNow--;
        for (let i = paginContID.children.length - 2; i >= 0; i--) {
          if ($(paginContID.children[i]).is(':visible')) {
            if (i == paginContID.children.length - 2) {
              $(bNext).removeAttr('disabled');
              trigLast = 1
            }
            $(paginContID.children[i]).css({
              'animation-name': 'fadeOutRight'
            });
            setTimeout(function() {
              $(paginContID.children[i]).css({
                'display': 'none'
              });
            }, 600);
            countHide++;
          } else if (countHide == countElem || (trigLast)) {
            countShowed++
            setTimeout(function() {
              $(paginContID.children[i]).css({
                'display': 'flex'
              });
              $(paginContID.children[i]).css({
                'animation-name': 'fadeInLeft'
              });
            }, 600)
            if (countShowed > countElem - 1) {
              if (i == 0) {
                $(bPrevious).attr('disabled', 'disabled');
                if (buttonID[0]) {
                  buttonID[0].setAttribute('disabled', 'disabled');
                }
              }
              break;
            }
          }
        }
      }

      $('[name="bNumberPaging"]').click(function() {
        let oneMoreTrigger = 0;
        let buttonID = $(paginContID).children().last().find("div").children();
        if (this.value != 'points') {
          if ((Math.ceil((paginContID.children.length - 1) / countElem) > 7) && (+PageNow <= Math.ceil((+paginContID.children.length - 1) / +countElem) - 4) && +PageNow > 3 && (this.value != Math.ceil((+paginContID.children.length - 1) / +countElem) - 1) && this.value != 0) {
            trigOnce = 3;
            if (PageNow < this.value) {
              bNextF();
            } else if (PageNow >= this.value) {
              bPreviousF();
            }
          } else {
            PageNow = this.value;
            $(buttonID).removeAttr('disabled');
            $(buttonID).removeClass('bNumberPagingSelected');
            if ((Math.ceil((paginContID.children.length - 1) / countElem) > 7)) {
              if (PageNow >= this.value) {
                if (this.value == Math.ceil(((+paginContID.children.length - 1) / +countElem) - 5)) {
                  oneMoreTrigger = 1;
                  $(buttonID[3]).attr('disabled', 'disabled');
                  $(buttonID[3]).addClass('bNumberPagingSelected');
                }
              }
              if (PageNow <= this.value && (Math.ceil((paginContID.children.length - 1) / countElem) > 7)) {
                if (this.value == 4) {
                  oneMoreTrigger = 1;
                  $(buttonID[3]).attr('disabled', 'disabled');
                  $(buttonID[3]).addClass('bNumberPagingSelected');
                }
              }
            }
            if (oneMoreTrigger == 0) {
              $(this).attr('disabled', 'disabled');
              $(this).addClass('bNumberPagingSelected');
            }
            for (let i = 0; i < paginContID.children.length - 1; i++) {
              if ($(paginContID.children[i]).is(':visible')) {
                if (i != paginContID.children.length - 2) {
                  $(bNext).removeAttr('disabled');
                }
                if (i != 0) {
                  $(bPrevious).removeAttr('disabled');
                }
                $(paginContID.children[i]).css({
                  'animation-name': 'fadeOut'
                });
                setTimeout(function() {
                  $(paginContID.children[i]).css({
                    'display': 'none'
                  });
                }, 600);
              }
            }
            for (let i = PageNow * countElem; i < PageNow * countElem + countElem; i++) {
              setTimeout(function() {
                $(paginContID.children[i]).css({
                  'display': 'flex'
                });
                $(paginContID.children[i]).css({
                  'animation-name': 'fadeIn'
                });
              }, 600)
              if (i == 0) {
                $(bPrevious).attr('disabled', 'disabled');
              } else if (i == paginContID.children.length - 2) {
                $(bNext).attr('disabled', 'disabled');
              }
              if ((Math.ceil((paginContID.children.length - 1) / countElem) > 7)) {
                if (PageNow < 4) {
                  trigOnce = PageNow
                }
                if (PageNow <= Math.ceil((+paginContID.children.length - 1) / +countElem) && PageNow >= Math.ceil((+paginContID.children.length - 1) / +countElem) - 2) {
                  trigOnce = 7 - (Math.ceil((+paginContID.children.length - 1) / +countElem) - PageNow);
                }

                if (PageNow == 4) {
                  $(buttonID[1]).text('...');
                  $(buttonID[1]).val('points');
                  $(buttonID[2]).text(+PageNow);
                  $(buttonID[2]).val(+PageNow - 1);
                  $(buttonID[3]).text(+PageNow + 1); //;
                  $(buttonID[3]).val(+PageNow);
                  $(buttonID[4]).text(+PageNow + 2);
                  $(buttonID[4]).val(+PageNow + 1);
                  $(buttonID[5]).text('...');
                  $(buttonID[5]).val('points');
                }

                if (PageNow == Math.ceil(((+paginContID.children.length - 1) / +countElem) - 5)) {
                  $(buttonID[1]).text('...');
                  $(buttonID[1]).val('points');
                  $(buttonID[2]).text(+PageNow);
                  $(buttonID[2]).val(+PageNow - 1);
                  $(buttonID[3]).text(+PageNow + 1); //;
                  $(buttonID[3]).val(+PageNow);
                  $(buttonID[4]).text(+PageNow + 2);
                  $(buttonID[4]).val(+PageNow + 1);
                  $(buttonID[5]).text('...');
                  $(buttonID[5]).val('points');
                  trigOnce = 3;
                }
                if (i == 0) {
                  $(bPrevious).attr('disabled', 'disabled');
                  $(buttonID[1]).text('2');
                  $(buttonID[1]).val('1');
                  $(buttonID[2]).text(3);
                  $(buttonID[2]).val(2);
                  $(buttonID[3]).text(4); //;
                  $(buttonID[3]).val(3);
                  $(buttonID[4]).text(5);
                  $(buttonID[4]).val(4);
                  $(buttonID[5]).text('...');
                  $(buttonID[5]).val('points');
                }
                if (i == paginContID.children.length - 2) {
                  $(bNext).attr('disabled', 'disabled');
                  $(buttonID[1]).text('...');
                  $(buttonID[1]).val('points');
                  $(buttonID[2]).text(Math.ceil(((paginContID.children.length - 1) / countElem) - 4));
                  $(buttonID[2]).val(Math.ceil(((paginContID.children.length - 1) / countElem) - 5));
                  $(buttonID[3]).text(Math.ceil(((paginContID.children.length - 1) / countElem) - 3));
                  $(buttonID[3]).val(Math.ceil(((paginContID.children.length - 1) / countElem) - 4));
                  $(buttonID[4]).text(Math.ceil(((paginContID.children.length - 1) / countElem) - 2));
                  $(buttonID[4]).val(Math.ceil(((paginContID.children.length - 1) / countElem) - 3));
                  $(buttonID[5]).text(Math.ceil(((paginContID.children.length - 1) / countElem) - 1));
                  $(buttonID[5]).val(Math.ceil(((paginContID.children.length - 1) / countElem) - 2));
                }

              }
            }
          }
        }
      });
    }
  }
}