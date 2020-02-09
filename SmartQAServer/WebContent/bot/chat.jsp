 <!-- ******CHAT WINDOW****** -->

    <div id="chat" style="display: none;">
      <div class="panel panel-default" style="width:425px; ">
        <div class="panel-heading text-center" style="height: 50px;">
          <button class="chatButton"><img src="bot/images/Minerva.jpg" style="height: 37px; width: 74px;"/>&nbsp;&nbsp;Chat with Minerva </button>
          <span id="minusID" class="title-btns minimize-minus"></span>&nbsp;<span id="arrowId" class="title-btns minimize-arrow-upright" ></span>
        </div>
        <div class="panel-body">
          <div class="conversation"></div>
          <div class="col-sm-12 chatForm">
          <div class="col-sm-8">
            <input id="yousay" class="form-control" placeholder="Say something..."/>
            </div>
            <div class="col-sm-4">
            <span style="color: #505050;" ><i
			class="fa fa-microphone fa-lg" onclick="startDictation1()" style="cursor: pointer; margin-top: 10px;"></i></span>

			<img alt="clear" src="bot/images/clear-icon.png" onclick="clearConversation()" style="height: 20px; width: 20px; cursor: pointer; margin-left: 2px;">
			
			<img alt="speakOut" src="bot/images/speakout.jpg" onclick="speakOut()" style="height: 15px; width: 20px; cursor: pointer; margin-left: 2px;">
			<i id="notifyID" class="fa fa-bell" style="font-size:16px; margin-left: 2px; cursor: pointer;"></i>
			<i id="notifyID1" class="fa fa-bell-slash" style="font-size:16px; margin-left: 2px; cursor: pointer;"></i>
			</div>
          </div>
        </div>
      </div>
    </div> 
    
    
     <div id="chatajaxloader" class="modal" style="display: none">
        <div class="center" style="margin-left: 1125px; margin-top: 350px;">
            <img alt="" style="width: 115px; height: 115px;" src="bot/images/loader2.gif" />
        </div>
    </div>
    <!-- ******END OF CHAT WINDOW****** -->

<script type="text/javascript" src="js/bootbox.min.js"></script>