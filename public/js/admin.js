/**
* 프로필 사진 업로드 처리
*
* @param Boolean isSuccess - true 업로드 성공, false - 실패
*/
function uploadCallback(isSuccess)
{
	/**
		성공
				1. 프로필 사진 -> 사진 추가 영역에 붙여 넣고
				2. 레이어 팝업 닫기

		실패
			1. 업로드 실패 메세지 출력 후 레이어 팝업 닫기
	*/
	if (isSuccess) { // 성공
		const tag = `<img src='/profile/profile'>`;
		$(".photo_upload").html(tag);
	} else { // 실패
		alert("이미지 업로드 실패");
	}

	layer.close();
}

$(function() {
	/** 파일 업로드 처리 */
	$("body").on("change", ".upload_box input[type='file']", function() {
		frmUpload.submit();
	});

	/** 주소 검색 */
	$(".search_address").click(function() {
		 new daum.Postcode({
			oncomplete: function(data) {
				$("input[name='address']").val(data.address);
			}
		}).open();
	});

	/** 양식 추가 처리 */
	$(".add_form").click(function() {
		const type = $(this).data("type");
		let template = "";
		switch (type) {
			case "학력" :
				template = "school";
				break;
			case "경력" :
				template = "job_history";
				break;
			case "인턴" :
				template = "intern";
				break;
			case "교육" :
				template = "education";
				break;
      case "자격증" :
      template = "license";
      break;
      case "수상" :
      template = "award";
      break;
      case "해외경험" :
      template = "overseas";
      break;
      case "어학" :
      template = "language";
      break;
		}

		if (template) {
			let html = $("#template_" + template).html();

			$target = $(this).closest(".form_inner").find(".form_html");
			if ($target.length > 0) {
				const no = new Date().getTime();
				html = html.replace(/<%=no%>/g, no);
			}

			$target.append(html);
		}
	});

	/** 양식 제거 처리 */
	$("body").on("click", ".form_html .remove", function() {
		$(this).closest(".rows").remove();
	});


	/** textarea 확대 축소 처리 */
	$("body").on("focus", ".form_html textarea", function() {
		$(this).removeClass("h200").addClass("h200");
	});

	$("body").on("blur", ".form_html textarea", function() {
		$(this).removeClass("h200");
	});
});